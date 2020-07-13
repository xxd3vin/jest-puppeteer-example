describe("Google", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    await page.goto("https://xxd3vin.github.io/about/");
  });

  it("should have Grab keyword", async () => {
    // API for page object
    // https://github.com/puppeteer/puppeteer/blob/v5.1.0/docs/api.md#class-page
    // await expect(page.title()).resolves.toMatch("About");
    await expect(page.content()).resolves.toMatch("Grab");
  });
});
