# NFL Team Range Ranking

A web-based tool for ranking all 32 NFL teams with range visualization. Drag teams to the chart and set best-case/realistic/worst-case ranking estimates from 1-32.

## 🏈 Features

- **Drag & Drop**: Drag teams from the pool to the ranking chart
- **1-32 Rankings**: Set best-case, realistic, and worst-case rankings for each team
- **Logo-Based Control**: Drag team logos to set average rankings
- **Auto-Sorting**: Teams automatically sort by average ranking (best to worst, left to right)
- **Visual Highlighting**: Recently adjusted teams are highlighted for easy tracking
- **Official Abbreviations**: Uses proper NFL team abbreviations (ARI, ATL, BAL, etc.)
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Live Demo

Visit: **https://joshconley.github.io/gmg-site**

## 🎮 How to Use

1. **Add Teams**: Drag NFL teams from the bottom pool to the chart area
2. **Set Rankings (1-32 scale)**:
   - **Green handle**: Best-case ranking (how high could they finish?)
   - **Team Logo**: Drag up/down to set realistic ranking expectation  
   - **Red handle**: Worst-case ranking (how low could they finish?)
3. **Default Range**: New teams start at rank 16 (avg) with 8-24 range
4. **Auto-Sort**: Teams automatically sort left-to-right by average rank when you release the logo
5. **Remove Teams**: Double-click the range bar to send teams back to the pool
6. **Reset**: Use the reset button to clear all rankings

## 💾 Data Persistence

Your rankings are automatically saved to your browser's local storage and will persist between sessions.

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/joshconley/gmg-site.git
cd gmg-site

# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## 📱 Mobile Friendly

The app is fully responsive and works great on mobile devices with touch controls.

## 🎨 Visual Design

- Modern gradient background
- Real NFL team logos from ESPN
- Logo-based ranking sliders for intuitive control
- 1-32 ranking scale (like actual NFL standings)
- Smooth animations and transitions
- Visual feedback for active teams
- Clean, intuitive interface

---

*Built with vanilla HTML, CSS, and JavaScript*