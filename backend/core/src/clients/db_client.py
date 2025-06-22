from abc import ABC, abstractmethod
from enum import Enum

from models import News, Tag

import psycopg
from psycopg.sql import SQL
from psycopg import rows


class QueryType(Enum):
    READ = 1
    WRITE = 2


class DbClient(ABC):
    @abstractmethod
    def run_query(self, query: SQL, type: QueryType) -> list[rows.TupleRow] | int:
        pass

    @abstractmethod
    def get_tags(self) -> list[Tag]:
        pass

    @abstractmethod
    def save_news(self, news: list[News]) -> int:
        pass


class PgClient(DbClient):
    def __init__(self, conn_str: str) -> None:
        self.conn_str = conn_str

    def get_connection(self) -> psycopg.Connection:
        return psycopg.connect(conninfo=self.conn_str, row_factory=rows.tuple_row)

    def run_query(self, query: SQL, type: QueryType) -> list[rows.TupleRow] | int:
        with self.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(query)
                if type is QueryType.READ:
                    return cur.fetchall()
                elif type is QueryType.WRITE:
                    conn.commit()
                    return cur.rowcount

    def get_tags(self) -> list[Tag]:
        row_list: list[rows.TupleRow] = self.run_query(
            SQL("SELECT name FROM tags"), QueryType.READ
        )
        return [Tag(name=str(row[0]).lower()) for row in row_list]

    def save_news(self, news: list[News]) -> int:
        news_added: int = self.run_query(SQL(""), QueryType.WRITE)
        return news_added
