<!-- markdownlint-disable -->
<div align="center">
  <img src="pages/popup/src/common/assets/logoSM.svg" height="">
</div>
<div align="center">
<br />
<!-- markdownlint-restore -->

⚠️ Work in progress ⚠️
🚨 Now in experimental phase 🚨

</div>

Welcome to Umbra an experimental and progressive Aztec Protocol wallet!

In the vast and evolving world of Web3, a wallet is not just a tool; it's the gateway to a whole new universe. It's the first consumer application anyone encounters in a blockchain ecosystem, and it's pivotal in shaping the user experience. That's where Umbra steps in!

Umbra is at the frontier, leading the way in innovation and user-centric design. We're not just building a wallet; we're crafting the cornerstone of zero-knowledge application interaction design. With Umbra, you're stepping into the future of privacy-focused blockchain interactions.

## Getting Started 🚀

### Prerequisites 📌

- [NVM](https://github.com/nvm-sh/nvm)
- [pnpm](https://pnpm.io/installation)

### Installation 💻

Make sure you're on the right Node.js version, and you have pnpm installed.

```shell
$ nvm use
$ npm i -g pnpm
```

Install the dependencies:

```shell
$ pnpm i
```

From `apps/extension` copy the `.env.example` as `.env` and adjust the variables there.

Build the project:

```shell
$ pnpm run build
```

## Development 🛠️

After building the project, you'll find the extension files in the `dist` folder. To load the extension in your browser:

1. Open your browser (Chrome, Firefox, or Edge) and navigate to the extensions page:
   - Chrome: `chrome://extensions`
   - Firefox: `about:debugging#/runtime/this-firefox`
   - Edge: `edge://extensions`

2. Enable "Developer mode" (usually a toggle in the top right corner).

3. Click "Load unpacked" (Chrome/Edge) or "Load Temporary Add-on" (Firefox).

4. Navigate to the `dist` folder in your project directory and select it.

The Umbra extension should now be loaded and visible in your browser's toolbar.

To start the development server:

```shell
$ pnpm run dev
```

This command will watch for file changes and rebuild the extension. After making changes, you'll need to refresh the extension in your browser:

- Chrome/Edge: Right-click the extension icon and select "Reload"
- Firefox: Click the "Reload" button next to the extension on the `about:debugging#/runtime/this-firefox` page

Remember to reload the extension after each change to see the updates in your browser.
## Contributors ✨

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/satyambnsal"><img src="https://avatars.githubusercontent.com/u/13951843?v=4?s=100" width="100px;" alt="Satyam Bansal"/><br /><sub><b>Satyam Bansal</b></sub></a><br /><a href="https://github.com/tileville/tileville/commits?author=satyambnsal" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yassmittal"><img src="https://avatars.githubusercontent.com/u/112745526?v=4?s=100" width="100px;" alt="Yash Mittal"/><br /><sub><b>Yash Mittal</b></sub></a><br /><a href="https://github.com/tileville/tileville/commits?author=yassmittal" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->