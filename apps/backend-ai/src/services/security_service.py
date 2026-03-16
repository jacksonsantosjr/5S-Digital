import re
from typing import List, Dict, Any

class SecurityService:
    def __init__(self):
        # Padrões comuns de dados sensíveis (PII) para LGPD/GDPR
        self.pii_patterns = {
            "CPF": r"\b\d{3}\.\d{3}\.\d{3}-\d{2}\b",
            "E-mail": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
            "Telefone": r"\b(?:\(?\d{2}\)?\s?)?\d{4,5}-\d{4}\b",
            "Cartão de Crédito": r"\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b"
        }

    def scan_for_sensitive_data(self, text: str) -> Dict[str, Any]:
        """
        Analisa o texto em busca de dados sensíveis e retorna a localização/tipo.
        """
        found_pii = []
        for pii_type, pattern in self.pii_patterns.items():
            matches = re.findall(pattern, text)
            if matches:
                found_pii.append({
                    "type": pii_type,
                    "count": len(matches),
                    "severity": "high" if pii_type in ["CPF", "Cartão de Crédito"] else "medium"
                })
        
        return {
            "is_secure": len(found_pii) == 0,
            "sensitive_data_found": found_pii,
            "risk_score": self.calculate_risk_score(found_pii),
            "recommendation": "Aplicar mascaramento ou criptografia imediata" if found_pii else "Arquivo seguro"
        }

    def calculate_risk_score(self, found_pii: List[Dict[str, Any]]) -> int:
        """
        Calcula um score de risco de 0 a 100 baseado na severidade dos dados.
        """
        score = 0
        for item in found_pii:
            if item["severity"] == "high":
                score += item["count"] * 20
            else:
                score += item["count"] * 5
        return min(score, 100)

    def mask_data(self, text: str) -> str:
        """
        Mascara dados sensíveis para visualização segura.
        """
        masked_text = text
        for pii_type, pattern in self.pii_patterns.items():
            masked_text = re.sub(pattern, f"[{pii_type} PROTEGIDO]", masked_text)
        return masked_text
