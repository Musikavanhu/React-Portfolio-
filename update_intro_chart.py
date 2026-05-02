import json

with open('/Users/tinomusikavanhu/Desktop/Safehaven/Portfolio/data/posts.json', 'r') as f:
    posts = json.load(f)

for post in posts:
    if post['slug'] == 'architecture-of-the-ai-dollar':
        # Add the infographic right after the first heading and first paragraph.
        new_content = []
        inserted = False
        for i, block in enumerate(post['content']):
            new_content.append(block)
            
            # Insert infographic after the second paragraph of the intro (so it acts as a visual thesis early on)
            if not inserted and i == 1 and block['type'] == 'paragraph':
                new_content.append({
                    "type": "chart",
                    "text": "",
                    "chartData": {
                        "type": "infographic",
                        "title": "The Global Transition",
                        "description": "Visualizing the structural realignment from physical hydrocarbon commodities to informational compute substrates.",
                        "data": {
                            "petro": [
                                { "label": "Underlying Substrate", "value": "Hydrocarbons (Crude Oil & Gas)" },
                                { "label": "Primary Demand Driver", "value": "Physical Global Energy Consumption" },
                                { "label": "Geographic Moat", "value": "Geologically Fixed & Militarily Secured" },
                                { "label": "Settlement Layer", "value": "SWIFT & Traditional Banking Ledgers" }
                            ],
                            "ai": [
                                { "label": "Underlying Substrate", "value": "Compute & Cognitive Labor (Tokens/FLOPs)" },
                                { "label": "Primary Demand Driver", "value": "Agentic AI & Global Automation" },
                                { "label": "Geographic Moat", "value": "Data Centers, Fab Plants & Sovereign IP" },
                                { "label": "Settlement Layer", "value": "Dollar-pegged Stablecoins & Web3 Rails" }
                            ]
                        }
                    }
                })
                inserted = True
                
        post['content'] = new_content

with open('/Users/tinomusikavanhu/Desktop/Safehaven/Portfolio/data/posts.json', 'w') as f:
    json.dump(posts, f, indent=2)

print("Injected infographic to posts.json")
