// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).
// This runs in the Figma Sandbox

// 1. Show the UI 
figma.showUI(__html__, { width: 300, height: 200 });

// Helper function to generate random data
function getRandomExpense() {
  const merchants = ["Starbucks", "Uber", "Amazon AWS", "WeWork", "Apple Store", "Delta Airlines"];
  const amounts = ["$4.50", "$24.99", "$120.00", "$9.99", "$2,400.00", "$450.00"];
  
  const randomMerchant = merchants[Math.floor(Math.random() * merchants.length)];
  const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
  
  return `${randomMerchant} - ${randomAmount}`;
}

// 2. Listen for messages from the UI
figma.ui.onmessage = async (msg) => {

  if (msg.type === 'create-expense') {
    
    // A. Load the font (REQUIRED step in Figma)
    // We will use standard Inter font
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });

    // B. Create the text node
    const textNode = figma.createText();
    
    // C. Set the content
    textNode.characters = getRandomExpense();
    
    // D. Style the text (optional, but looks nice)
    textNode.fontSize = 24;
    
    // E. Position the text in the center of the user's current view
    textNode.x = figma.viewport.center.x;
    textNode.y = figma.viewport.center.y;

    // F. Select the new node so the user sees it immediately
    figma.currentPage.selection = [textNode];
    
    // Notify the user via a small toast message at the bottom
    figma.notify("Expense added! 💸");
  }

  // Note: We are NOT calling figma.closePlugin() so the user can keep clicking.
};