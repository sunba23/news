from abc import ABC, abstractmethod

from models import Tag

import psycopg
from psycopg.sql import SQL
from psycopg import rows


class DbClient(ABC):
    @abstractmethod
    def run_query(self, query: SQL) -> list[rows.TupleRow]:
        pass

    @abstractmethod
    def get_tags(self) -> list[Tag]:
        pass


class PgClient(DbClient):
    def __init__(self, conn_str: str) -> None:
        self.conn_str = conn_str

    def get_connection(self) -> psycopg.Connection:
        return psycopg.connect(conninfo=self.conn_str, row_factory=rows.tuple_row)

    def run_query(self, query: SQL) -> list[rows.TupleRow]:
        with self.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(query)
                return cur.fetchall()

    def get_tags(self) -> list[Tag]:
        rows = self.run_query(SQL("SELECT name FROM tags"))
        return [Tag(name=str(row[0]).lower()) for row in rows]
