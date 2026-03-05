import natural from "natural";
import cosineSimilarity from "compute-cosine-similarity";
import { kmeans } from "ml-kmeans";

const TfIdf = natural.TfIdf;

/**
 * 🧮 Product Recommendation (TF-IDF + Cosine Similarity)
 * Finds products most similar to the target product based on description/category
 */
export const getRecommendations = (targetProduct, allProducts) => {
  if (allProducts.length < 2) return [];

  const tfidf = new TfIdf();

  // Combine name and category for text analysis
  const docs = allProducts.map(
    (p) => `${p.name_en} ${p.category} ${p.category_te}`,
  );
  docs.forEach((doc) => tfidf.addDocument(doc));

  // Get the vector for the target product
  const targetIndex = allProducts.findIndex((p) => p.id === targetProduct.id);
  if (targetIndex === -1) return [];

  // Manual Vectorization for Cosine Similarity
  const terms = Array.from(new Set(docs.join(" ").split(" ")));
  const vectors = docs.map((doc, i) => {
    return terms.map((term) => tfidf.tfidf(term, i));
  });

  const targetVector = vectors[targetIndex];

  // Calculate similarity scores
  const scores = allProducts.map((p, i) => {
    if (p.id === targetProduct.id) return { product: p, score: -1 };

    // Safety check for vector length and non-zero values
    const score = cosineSimilarity(targetVector, vectors[i]) || 0;
    return { product: p, score: score };
  });

  // Sort by score (descending) and return top 5
  return scores
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => s.product);
};

/**
 * 📦 Product Grouping (K-Means Clustering)
 * Groups products into K clusters based on Price and Category Index
 */
export const groupProducts = (allProducts, clusters = 3) => {
  if (allProducts.length < clusters) return [];

  const categories = Array.from(new Set(allProducts.map((p) => p.category)));

  // Prepare data: [Normalized Price, Category Index]
  const data = allProducts.map((p) => [
    p.price / 1000, // Normalize price to similar scale as index
    categories.indexOf(p.category),
  ]);

  const result = kmeans(data, clusters, {
    initialization: "mostFar",
  });

  // Map clusters back to products
  const grouped = result.clusters.map((clusterId, index) => ({
    ...allProducts[index],
    cluster_id: clusterId,
  }));

  return grouped;
};
