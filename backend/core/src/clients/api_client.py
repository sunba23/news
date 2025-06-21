from abc import ABC, abstractmethod

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
        # TODO use NewsApiClientC to fetch news on topics
        for tag in tags:
            print(tag.name)
        return []
