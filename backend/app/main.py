from fastapi import FastAPI
from app.routes import cart_routes, auth_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cart_routes.router, prefix="/api")
app.include_router(auth_routes.router, prefix="/api/auth")
