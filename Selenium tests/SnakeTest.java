

import static org.junit.Assert.assertEquals;

import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import org.openqa.selenium.Rectangle;

public class SnakeTest {

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
	public void ScoreTest() throws InterruptedException {
		driver.get(pathLoginPage);
		driver.manage().window().maximize();
		Thread.sleep(1000);
		String strMessage=driver.findElement(By.id("score")).getText();
		assertEquals("Failed test case", strMessage, "0");
	}

	@Test
	public void StartTest() throws InterruptedException {
		driver.get(pathLoginPage);
		driver.manage().window().maximize();
		String strMessage=driver.findElement(By.id("start")).getText();
		assertEquals("Failed test case", strMessage, "Start Game");
		driver.findElement(By.id("start")).click();
		Thread.sleep(1000);
		strMessage=driver.findElement(By.id("stop")).getText();
		assertEquals("Failed test case", strMessage, "Stop");
		driver.findElement(By.id("stop")).click();
		Thread.sleep(1000);
		strMessage=driver.findElement(By.id("reset")).getText();
		assertEquals("Failed test case", strMessage, "Reset");
	}
	
	@Test
	public void CanvasTest() throws InterruptedException {
		driver.get(pathLoginPage);
		driver.manage().window().maximize();
		Thread.sleep(1000);
		Rectangle rec =driver.findElement(By.id("snakeboard")).getRect();
		assertEquals("Failed test case", rec.getWidth(), "1000");
		assertEquals("Failed test case", rec.getHeight(), "750");
	}
}
