const { BASE_URL } = require("./config.js");

/**
 * https://gist.github.com/tokland/d3bae3b6d3c1576d8700405829bbdb52
 */
const escapeXpathString = (str) => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
  return `concat('${splitedQuotes}', '')`;
};

/**
 * ```
 * <a href="https://google.com"><span>text</span></a>
 * ```
 * Base on https://gist.github.com/tokland/d3bae3b6d3c1576d8700405829bbdb52
 */
const clickByText = async (page, text) => {
  const xpath = `//a/span[contains(text(), ${escapeXpathString(text)})]`;
  console.log("[DEBUG] xpath:", xpath);
  const linkHandlers = await page.$x(xpath);

  if (linkHandlers.length > 0) {
    await linkHandlers[0].click();
  } else {
    throw new Error(`Link not found: ${text}`);
  }
};

describe("xxd3vin.github.io", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    await page.goto(`${BASE_URL}/about/`);
  });

  it("should have xxd3vin keyword", async () => {
    // API for page object
    // https://github.com/puppeteer/puppeteer/blob/v5.1.0/docs/api.md#class-page
    await expect(page.title()).resolves.toMatch("About");
    await expect(page.content()).resolves.toMatch("xxd3vin");
  });

  it("should go to GitHub", async () => {
    await clickByText(page, "xxd3vin");
    await page.waitForNavigation({ waitUntil: "load" });
    console.log("Current page:", page.url());
    await expect(page.title()).resolves.toMatch(
      "xxd3vin (Devin Chen) · GitHub"
    );
  });
});
