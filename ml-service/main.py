import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Lakshmi Fashion ML Service")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Config
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

class Product(BaseModel):
    id: str
    name_en: str
    name_te: Optional[str]
    category: str
    category_te: Optional[str]
    price: float

@app.get("/")
async def root():
    return {"message": "🪡 Lakshmi Fashion ML Service is Online"}

@app.get("/recommendations/{product_id}")
async def get_recommendations(product_id: str):
    try:
        # Fetch all products from Supabase
        response = supabase.table("products").select("*").execute()
        all_products = response.data

        if not all_products:
            raise HTTPException(status_code=404, detail="No products found")

        df = pd.DataFrame(all_products)
        
        # Check if target product exists
        if product_id not in df['id'].values:
            raise HTTPException(status_code=404, detail="Product ID not found")

        # Prepare text for TF-IDF
        df['metadata'] = df['name_en'] + " " + df['category'] + " " + df['category_te'].fillna('')
        
        # TF-IDF Vectorization
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(df['metadata'])

        # Cosine Similarity
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        
        # Get index of target product
        idx = df.index[df['id'] == product_id].tolist()[0]
        
        # Get similarity scores
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        
        # Top 5 similar products (excluding self)
        sim_scores = [i for i in sim_scores if i[0] != idx][:5]
        product_indices = [i[0] for i in sim_scores]
        
        return {"success": True, "recommendations": df.iloc[product_indices].to_dict('records')}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/clusters")
async def get_clusters(k: int = 3):
    try:
        response = supabase.table("products").select("*").execute()
        all_products = response.data
        
        if len(all_products) < k:
            return {"success": True, "clusters": all_products}

        df = pd.DataFrame(all_products)
        
        # Features for K-Means: Price and Category encoded
        df['category_idx'] = pd.Categorical(df['category']).codes
        X = df[['price', 'category_idx']]
        
        # Normalize Data
        X_norm = (X - X.mean()) / X.std()

        # K-Means Clustering
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        df['cluster_id'] = kmeans.fit_predict(X_norm)
        
        return {"success": True, "clusters": df.to_dict('records')}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
