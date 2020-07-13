describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://github.com');
  });

  it('should be titled "GitHub"', async () => {
    await expect(page.title()).resolves.toMatch('GitHub');
  });
});
