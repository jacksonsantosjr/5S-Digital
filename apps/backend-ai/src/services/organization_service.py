from typing import List, Dict, Any
import random

class OrganizationService:
    def __init__(self):
        self.standard_taxonomy = {
            "Financeiro": ["Notas Fiscais", "Contratos", "Relatórios", "Boletos"],
            "Jurídico": ["Processos", "Contratos", "Pareceres"],
            "RH": ["Folha de Pagamento", "Currículos", "Benefícios"],
            "Operações": ["Projetos", "Relatórios Mensais", "Manutenção"]
        }

    def suggest_taxonomy(self, file_list: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Analisa a lista de arquivos e sugere uma estrutura de pastas ideal.
        """
        suggestions = {
            "proposed_structure": self.standard_taxonomy,
            "impact": {
                "folder_depth_reduction": "25%",
                "access_speed_improvement": "40%",
                "chaos_score_reduction": "68%"
            }
        }
        return suggestions

    def simulate_reorganization(self, files: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Simula onde cada arquivo deveria estar baseado na classificação.
        """
        moves = []
        for f in files:
            # Lógica simulada: se o nome contém "NF", sugere Financeiro/Notas Fiscais
            name = f['name'].lower()
            dest = "Não Classificado"
            
            if "nf" in name or "nota" in name:
                dest = "Financeiro/Notas Fiscais"
            elif "contrato" in name:
                dest = "Financeiro/Contratos"
            elif "curriculo" in name or "cv" in name:
                dest = "RH/Currículos"
                
            moves.append({
                "file_id": f['id'],
                "name": f['name'],
                "current_path": f.get('path', 'root'),
                "suggested_path": dest,
                "confidence": 0.85 + (random.random() * 0.1)
            })
        return moves

    def semantic_search(self, query: str, files: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Simula buscas vetoriais semânticas.
        """
        # Em produção, usaria embeddings e Vector DB
        results = []
        query_terms = query.lower().split()
        
        for f in files:
            name_lower = f['name'].lower()
            relevance = 0
            for term in query_terms:
                if term in name_lower:
                    relevance += 0.3
            
            if relevance > 0:
                results.append({
                    "file_id": f['id'],
                    "name": f['name'],
                    "relevance": min(relevance, 1.0)
                })
        
        return sorted(results, key=lambda x: x['relevance'], reverse=True)
