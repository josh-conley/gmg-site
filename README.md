# NFL Team Range Ranking

A web-based tool for ranking NFL teams with range visualization. Drag teams to the chart and set high/average/low estimates for each team's performance.

## 🏈 Features

- **Drag & Drop**: Drag teams from the pool to the ranking chart
- **Range Control**: Set high, average, and low estimates for each team
- **Auto-Sorting**: Teams automatically sort by average ranking (left to right)
- **Visual Highlighting**: Recently adjusted teams are highlighted for easy tracking
- **Official Abbreviations**: Uses proper NFL team abbreviations (ARI, ATL, BAL, etc.)
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Live Demo

Visit: **https://joshconley.github.io/nfl-ranker**

## 🎮 How to Use

1. **Add Teams**: Drag NFL teams from the bottom pool to the chart area
2. **Set Ranges**: 
   - **Green handle**: High estimate (best case scenario)
   - **Yellow handle**: Average/realistic expectation  
   - **Red handle**: Low estimate (worst case scenario)
3. **Auto-Sort**: Teams sort automatically by average when you release the yellow handle
4. **Remove Teams**: Double-click any team in the chart to send it back to the pool
5. **Reset**: Use the reset button to clear all rankings

## 💾 Data Persistence

Your rankings are automatically saved to your browser's local storage and will persist between sessions.

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/joshconley/nfl-ranker.git
cd nfl-ranker

# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## 📱 Mobile Friendly

The app is fully responsive and works great on mobile devices with touch controls.

## 🎨 Visual Design

- Modern gradient background
- Team-colored logos with official NFL abbreviations
- Smooth animations and transitions
- Visual feedback for active teams
- Clean, intuitive interface

---

*Built with vanilla HTML, CSS, and JavaScript*