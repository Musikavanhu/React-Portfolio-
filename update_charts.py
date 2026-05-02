import json

with open('/Users/tinomusikavanhu/Desktop/Safehaven/Portfolio/data/posts.json', 'r') as f:
    posts = json.load(f)

for post in posts:
    if post['slug'] == 'architecture-of-the-ai-dollar':
        # Remove old tables and inject charts
        new_content = []
        for block in post['content']:
            if block['type'] == 'paragraph' and 'System Feature |' in block['text']:
                continue
            if block['type'] == 'paragraph' and 'Underlying Commodity |' in block['text']:
                continue
            if block['type'] == 'paragraph' and 'Primary Demand Driver |' in block['text']:
                continue
            if block['type'] == 'paragraph' and 'Settlement Mechanism |' in block['text']:
                continue
            if block['type'] == 'paragraph' and 'Sovereign Recycling |' in block['text']:
                continue
            if block['type'] == 'paragraph' and 'Geographic/Physical Moat |' in block['text']:
                continue
            if block['type'] == 'paragraph' and 'Key Systemic Vulnerability |' in block['text']:
                continue
            
            # Second table
            if block['type'] == 'paragraph' and 'Metric |' in block['text']:
                # Inject horizontal chart instead
                new_content.append({
                    "type": "chart",
                    "text": "",
                    "chartData": {
                        "title": "Macro Metrics: Tech/AI vs. Traditional Energy (2025-2026)",
                        "type": "horizontal",
                        "data": [
                            {
                                "category": "Market Capitalization (Top Company)",
                                "values": [
                                    { "label": "NVIDIA (AI)", "value": 5200, "displayValue": "$5.2T" },
                                    { "label": "Saudi Aramco (Energy)", "value": 1800, "displayValue": "$1.8T" }
                                ]
                            },
                            {
                                "category": "Annual Capital Expenditure",
                                "values": [
                                    { "label": "Top 5 Tech Firms", "value": 400, "displayValue": "$400B+" },
                                    { "label": "Global Oil & Gas", "value": 350, "displayValue": "$350B" }
                                ]
                            },
                            {
                                "category": "Grid Power Demand Growth (YoY)",
                                "values": [
                                    { "label": "Data Centers", "value": 17, "displayValue": "~17%" },
                                    { "label": "Traditional Industrial", "value": 2, "displayValue": "~2%" }
                                ]
                            }
                        ]
                    }
                })
                continue
            if block['type'] == 'paragraph' and ('Top Company Market Cap |' in block['text'] or 'Annual Capital Expenditure |' in block['text'] or 'Sector Debt Issuance |' in block['text'] or 'Grid Power Demand Growth |' in block['text']):
                continue
                
            # Third table
            if block['type'] == 'paragraph' and 'Year |' in block['text'] and 'Central Bank Net Gold Purchases' in block['text']:
                # Inject vertical chart instead
                new_content.append({
                    "type": "chart",
                    "text": "",
                    "chartData": {
                        "title": "Central Bank Net Gold Purchases (Tonnes)",
                        "type": "bar",
                        "unit": "T",
                        "data": [
                            { "label": "2010-21 Avg", "value": 473 },
                            { "label": "2022", "value": 1136 },
                            { "label": "2023", "value": 1037 },
                            { "label": "2024", "value": 1037 },
                            { "label": "2025", "value": 863 }
                        ]
                    }
                })
                continue
            if block['type'] == 'paragraph' and ('2010-2021 (Avg) |' in block['text'] or '2022 |' in block['text'] or '2023 |' in block['text'] or '2024 |' in block['text'] or '2025 |' in block['text'] or '2026 (Q1/Q2) |' in block['text']):
                continue
            
            new_content.append(block)
        post['content'] = new_content

with open('/Users/tinomusikavanhu/Desktop/Safehaven/Portfolio/data/posts.json', 'w') as f:
    json.dump(posts, f, indent=2)

print("Updated charts in posts.json")
