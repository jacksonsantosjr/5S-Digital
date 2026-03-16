import random
from typing import Dict, Any

class AIService:
    def __init__(self):
        # Aqui no futuro carregaríamos modelos do HuggingFace ou OpenAI
        self.categories = [
            "Contrato", "Nota Fiscal", "Boleto", "Relatório", 
            "Comprovante", "Currículo", "Ata de Reunião", "Identidade"
        ]

    def classify_document(self, text_content: str) -> Dict[str, Any]:
        """
        Simula a classificação semântica de um documento baseado no texto.
        Na realidade, usaria embeddings e um classificador treinado.
        """
        # Simulação simples de detecção de palavras-chave
        text_lower = text_content.lower()
        
        category = "Outros"
        confidence = 0.5
        
        if "contrato" in text_lower or "cláusula" in text_lower:
            category = "Contrato"
            confidence = 0.95
        elif "nota fiscal" in text_lower or "danfe" in text_lower:
            category = "Nota Fiscal"
            confidence = 0.98
        elif "boleto" in text_lower or "vencimento" in text_lower:
            category = "Boleto"
            confidence = 0.92
        elif "currículo" in text_lower or "experiência" in text_lower:
            category = "Currículo"
            confidence = 0.88
            
        return {
            "category": category,
            "confidence": confidence,
            "entities": self.extract_entities(text_content)
        }

    def extract_entities(self, text: str) -> Dict[str, str]:
        """Extrai entidades básicas (simulado)."""
        return {
            "data": "16/03/2026",
            "valor": "R$ 1.250,00",
            "cnpj": "00.000.000/0001-00"
        }

    def perform_ocr(self, file_bytes: bytes) -> str:
        """Simula a extração de texto via OCR."""
        # Aqui usaríamos Tesseract ou EasyOCR
        return "Este é um texto simulado extraído de uma imagem de nota fiscal."
