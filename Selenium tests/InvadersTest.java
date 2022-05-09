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

public class InvadersTest {

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
	public void PlayButtonTest() throws InterruptedException {
		driver.get(pathLoginPage);
		driver.manage().window().maximize();
		Thread.sleep(1000);
		String strMessage=driver.findElement(By.id("scoreDisplay")).getText();
		assertEquals("Failed test case", strMessage, "0");
	}

	@Test
	public void HomeButtonTest() throws InterruptedException {
		driver.get(pathLoginPage);
		driver.manage().window().maximize();
		String strMessage=driver.findElement(By.id("home")).click();
		Thread.sleep(1000);
		strMessage=driver.findElement(By.id("title")).getText();
		assertEquals("Failed test case", strMessage, "Old School Gaming");
	}
	
	@Test
	public void CanvasTest() throws InterruptedException {
		driver.get(pathLoginPage);
		driver.manage().window().maximize();
		Thread.sleep(1000);
		Rectangle rec =driver.findElement(By.id("screen")).getRect();
		assertEquals("Failed test case", rec.getWidth(), 1002);
		assertEquals("Failed test case", rec.getHeight(), 752);
	}
}
