from clients.api_client import ApiClient
from clients.db_client import DbClient
from config import Config

from clients.api_client import NewsApiClient
from clients.db_client import PgClient
from models import News

from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class App:
    def __init__(
        self, config: Config, db_client: DbClient, api_clients: list[ApiClient]
    ) -> None:
        self.config = config
        self.db_client = db_client
        self.api_clients = api_clients

    def fetch(self) -> list[News]:
        logger.info("Starting to fetch news...")
        try:
            tags = self.db_client.get_tags()
            logger.info(f"Found {len(tags)} tags")
            news: list[News] = []
            for api_client in self.api_clients:
                client_news = api_client.get_news(tags)
                news.extend(client_news)
                logger.info(f"Fetched {len(client_news)} news articles from {type(api_client).__name__}")
            logger.info(f"Total news articles fetched: {len(news)}")
            return news
        except Exception as e:
            logger.error(f"Error fetching news: {e}")
            raise

    def save(self, news) -> bool:
        logger.info(f"Saving {len(news)} news articles...")
        try:
            result = self.db_client.save_news(news)
            logger.info(f"Save operation result: {result}")
            return result
        except Exception as e:
            logger.error(f"Error saving news: {e}")
            raise


def main() -> None:
    logger.info("Starting news application...")
    
    try:
        logger.info("Loading environment variables...")
        load_dotenv()
        
        logger.info("Initializing configuration...")
        config = Config()
        config.set_defaults()
        logger.info(f"Config loaded - API key exists: {bool(config.api_key)}")
        logger.info(f"Database connection string: {config.conn_str}")

        logger.info("Initializing API clients...")
        api_clients: list[ApiClient] = [NewsApiClient(config=config)]
        
        logger.info("Initializing database client...")
        pg_client = PgClient(conn_str=config.conn_str)
        
        logger.info("Creating app instance...")
        app = App(config=config, db_client=pg_client, api_clients=api_clients)
        
        logger.info("Fetching news...")
        news: list[News] = app.fetch()
        
        if news:
            logger.info("Saving news to database...")
            success = app.save(news)
            if success:
                logger.info("✅ News application completed successfully!")
            else:
                logger.warning("⚠️ News fetched but save operation failed")
        else:
            logger.warning("⚠️ No news fetched")
            
    except Exception as e:
        logger.error(f"❌ Application failed with error: {e}")
        import traceback
        logger.error(f"Full traceback: {traceback.format_exc()}")
        raise


if __name__ == "__main__":
    main()