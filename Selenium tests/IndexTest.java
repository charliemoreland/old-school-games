package lab06;

import static org.junit.Assert.assertEquals;

import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class IndexTest {

	static WebDriver driver;

//	Change your selenium driver path here
	static String pathChromeDriver="";
	static String pathLoginPage="";

	String txtUsername="txtUsername";
	String txtPassword="txtPassword";
	String txtMessageLogin="txtMessageLogin";
	String linkSnake="linkSnake";
	String linkCheckers="linkCheckers";
	String linkConnect4="linkConnect4";
	String title = "title";
	

	@BeforeClass
	public static void openBrowser()
	{
		System.setProperty("webdriver.chrome.driver", pathChromeDriver);
		driver= new ChromeDriver() ;
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	@AfterClass
	public static void closeBrowser() {
		driver.quit();
	}

	@Test
	public void indexToSnakeDescriptionTest() throws InterruptedException {
		driver.get(pathLoginPage);
		driver.manage().window().maximize();
		driver.findElement(By.id(linkSnake)).click();
		Thread.sleep(1000);
		String strMessage=driver.findElement(By.xpath("//label[@id='"+title+"']")).getText();
		assertEquals("Failed test case", strMessage, "Snake");
	}

	@Test
	public void indexToCheckersDescriptionTest() throws InterruptedException {
		driver.get(pathLoginPage);
		driver.manage().window().maximize();
		driver.findElement(By.id(linkCheckers)).click();
		Thread.sleep(1000);
		String strMessage=driver.findElement(By.xpath("//label[@id='"+title+"']")).getText();
		assertEquals("Failed test case", strMessage, "Checkers");
	}
	
	@Test
	public void indexToConnect4DescriptionTest() throws InterruptedException {
		driver.get(pathLoginPage);
		driver.manage().window().maximize();
		driver.findElement(By.id(linkConnect4)).click();
		Thread.sleep(1000);
		String strMessage=driver.findElement(By.xpath("//label[@id='"+title+"']")).getText();
		assertEquals("Failed test case", strMessage, "Connect4");
	}
}
