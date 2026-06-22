import requests


class Supabase:
    """Client minimal PostgREST + RPC, authentifié en service_role.

    La clé service_role contourne le RLS : réservée au serveur, jamais au client.
    """

    def __init__(self, url: str, key: str) -> None:
        self.url = url
        self._h = {
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        }

    def rpc(self, fn: str, payload: dict):
        r = requests.post(f"{self.url}/rest/v1/rpc/{fn}", json=payload, headers=self._h, timeout=30)
        r.raise_for_status()
        return r.json() if r.text and r.text != "null" else None

    def select(self, table: str, query: str = ""):
        r = requests.get(f"{self.url}/rest/v1/{table}?{query}", headers=self._h, timeout=30)
        r.raise_for_status()
        return r.json()

    def insert(self, table: str, row: dict):
        h = dict(self._h)
        h["Prefer"] = "return=representation"
        r = requests.post(f"{self.url}/rest/v1/{table}", json=row, headers=h, timeout=30)
        r.raise_for_status()
        return r.json()

    def update(self, table: str, query: str, patch: dict):
        h = dict(self._h)
        h["Prefer"] = "return=representation"
        r = requests.patch(f"{self.url}/rest/v1/{table}?{query}", json=patch, headers=h, timeout=30)
        r.raise_for_status()
        return r.json()
