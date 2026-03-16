import hashlib
from typing import List, Dict, Any

class DeduplicationService:
    def __init__(self):
        # Em um cenário real, usaríamos um Vector DB (como Qdrant) para busca de similaridade
        pass

    def calculate_hash(self, file_content: bytes) -> str:
        """Calcula o hash SHA-256 de um arquivo para detecção de duplicatas exatas."""
        return hashlib.sha256(file_content).hexdigest()

    def identify_duplicates(self, files_metadata: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Identifica duplicatas baseadas em hash (exatas) e sugere duplicatas semânticas.
        files_metadata deve conter: {'id': str, 'name': str, 'hash': str, 'embedding': Optional[List[float]]}
        """
        seen_hashes = {}
        duplicates = []
        
        for file in files_metadata:
            f_hash = file.get('hash')
            if f_hash in seen_hashes:
                duplicates.append({
                    "original": seen_hashes[f_hash],
                    "duplicate": file['id'],
                    "type": "exact",
                    "reason": "Hash binário idêntico"
                })
            else:
                seen_hashes[f_hash] = file['id']
                
        # Simulação de similaridade semântica (conceitual)
        # Se dois arquivos têm nomes muito parecidos ou conteúdos próximos, a IA sinaliza
        return duplicates

    def get_semantic_suggestions(self, target_file: Dict[str, Any], candidates: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Simula a detecção de duplicatas semânticas (ex: Proposta_v1 vs Proposta_Final).
        """
        suggestions = []
        target_name = target_file['name'].lower()
        
        for cand in candidates:
            cand_name = cand['name'].lower()
            # Lógica simples de sobreposição de strings para o MVP
            if target_name != cand_name and (target_name in cand_name or cand_name in target_name):
                suggestions.append({
                    "file_id": cand['id'],
                    "name": cand['name'],
                    "similarity": 0.85, # Simulado
                    "type": "semantic",
                    "reason": "Nomenclatura e conteúdo altamente similares"
                })
        return suggestions
