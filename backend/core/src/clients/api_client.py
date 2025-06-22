from abc import ABC, abstractmethod
from datetime import datetime
from dateutil.relativedelta import relativedelta

from config import Config
from models import News, Tag

from newsapi import NewsApiClient as NewsApiClientC


class ApiClient(ABC):
    @abstractmethod
    def get_news(self, tags: list[Tag]) -> list[News]:
        pass


class NewsApiClient(ApiClient):
    def __init__(self, config: Config) -> None:
        self.client = NewsApiClientC(api_key=config.api_key)

    def get_news(self, tags: list[Tag]) -> list[News]:
        query = self.construct_query(tags)
        from_param = (datetime.today() - relativedelta(months=1)).strftime("%Y-%m-%d")
        news = self.client.get_everything(
            q=query,
            from_param=from_param,
            language="en",
            sort_by="publishedAt",
            page=2,
        )
        news_entries = news.get("articles", [])
        return self.parse_news(news_entries)

    @staticmethod
    def construct_query(tags: list[Tag]) -> str:
        out = ""
        for idx, tag in enumerate(tags):
            out += tag.name
            if idx != len(tags) - 1:
                out += " OR "
        return out

    @staticmethod
    def parse_news(news_entries) -> list[News]:
        news_list = []
        for news in news_entries:
            title = news.get("title", "")
            content = news.get("content", "") or news.get("description", "")
            author = news.get("author", "") or "Unknown"

            news_item = News(title=title, content=content, author=author)
            news_list.append(news_item)
        return news_list
