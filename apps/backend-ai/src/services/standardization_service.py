import re
from typing import List, Dict, Any, Optional

class StandardizationService:
    def __init__(self):
        # Padrão: AAAA-MM-Tipo-Assunto-vXXX
        self.default_pattern = r"^\d{4}-\d{2}-[a-zA-Z0-9]+-[a-zA-Z0-9]+-v\d{3}$"

    def validate_name(self, name: str, pattern: Optional[str] = None) -> Dict[str, Any]:
        """
        Valida se o nome do arquivo segue o padrão configurado.
        """
        regex = pattern if pattern else self.default_pattern
        is_valid = bool(re.match(regex, name.split('.')[0]))
        
        return {
            "name": name,
            "is_valid": is_valid,
            "suggested_name": self.suggest_correct_name(name) if not is_valid else None
        }

    def suggest_correct_name(self, name: str) -> str:
        """
        Tenta corrigir o nome do arquivo para o padrão (AAAA-MM-Outros-Assunto-v001).
        """
        import datetime
        now = datetime.datetime.now()
        clean_name = re.sub(r'[^a-zA-Z0-9]', '-', name.split('.')[0])
        ext = name.split('.')[-1] if '.' in name else ''
        
        return f"{now.year}-{now.month:02d}-Outros-{clean_name}-v001.{ext}"

    def rename_batch(self, files: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Gera sugestões de renomeação em massa para uma lista de arquivos.
        """
        results = []
        for f in files:
            results.append(self.validate_name(f['name']))
        return results
