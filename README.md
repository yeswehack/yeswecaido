# YesWeCaido

YesWeCaido is a Caido plugin that allows you to fetch all bug bounty programs on YesWeHack with all their details to your Caido instance.

<h1 align="center">
  <img src="assets/yeswecaido-logo.png" alt="logo" width="220px">
  <br>
</h1>
 
<p align="center">
  <a href="#features">Features</a> |
  <a href="#installation">Installation</a> |
  <a href="#usage">Usage</a>
</p>


## Features

YesWeCaido allows to fetch all [bug bounty programs on YesWeHack](https://yeswehack.com/programs) with all their details to your Caido instance. By default it will fetch all public programs. If you provide your JWT for your YesWeHack account you will then be able to see the full list of all your private programs.

When you select a program, YesWeCaido can automatically add the scope to Caido along with the custom User-Agent that the program provides.

## Installation

You can install YesWeCaido either by Caido's community store or manually.

### Via Caido's Community store (Recommended)
1. In Caido, go to the `Plugins` page in the left side panel
2. Navigate to the Community Store
3. Locate the `YesWeCaido` plugin and click install

### Manual Installation
1. Navigate to this Github repository's [Releases](https://github.com/yeswehack/yeswecaido/releases) page
2. Download the latest `plugin_package.zip`
3. In Caido, go to the `Plugins` page
4. Click 'Install Package' and select your downloaded `plugin_package.zip` file

## Usage
1. In Caido, click on `YesWeCaido` located on the left side panel
2. In `YesWeCaido`, Add your JWT in the top left input field (optional)
3. Select any program.
4. In the new side window that gives all the program details, add the scope and User-Agent (if present)
5. You can confirm that the scope and User-Agent have been added by navigating to the Caido's `Scopes` and `Match & Replace` page

<img src="assets/yeswecaido.gif" alt="usage-gif">
