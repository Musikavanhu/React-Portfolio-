import json

with open('/Users/tinomusikavanhu/Desktop/Safehaven/Portfolio/data/posts.json', 'r') as f:
    posts = json.load(f)

for post in posts:
    if post['slug'] == 'biomimetic-error-mitigation':
        new_content = []
        for block in post['content']:
            new_content.append(block)
            
            # insert scale dependence chart after the first paragraph of Scale Dependence Analysis
            if block['type'] == 'paragraph' and 'To characterize how the structural advantage evolves with block length' in block['text']:
                new_content.append({
                    "type": "chart",
                    "text": "",
                    "chartData": {
                        "title": "Scale Dependence (WER at fixed Eb/N0)",
                        "type": "horizontal",
                        "data": [
                            {
                                "category": "Small-Array Topology (n = 24)",
                                "values": [
                                    { "label": "Random LDPC", "value": 137, "displayValue": "0.137" },
                                    { "label": "Biomimetic 2D", "value": 74, "displayValue": "0.074 (Optimal)" }
                                ]
                            },
                            {
                                "category": "Medium-Array Topology (n ≈ 120)",
                                "values": [
                                    { "label": "Random LDPC", "value": 52, "displayValue": "0.052" },
                                    { "label": "Biomimetic 2D", "value": 45, "displayValue": "0.045 (Marginal)" }
                                ]
                            },
                            {
                                "category": "Global/Large Array (n ≈ 440)",
                                "values": [
                                    { "label": "Random LDPC", "value": 15, "displayValue": "0.015 (Optimal)" },
                                    { "label": "Biomimetic 2D", "value": 18, "displayValue": "0.018" }
                                ]
                            }
                        ]
                    }
                })

        post['content'] = new_content

with open('/Users/tinomusikavanhu/Desktop/Safehaven/Portfolio/data/posts.json', 'w') as f:
    json.dump(posts, f, indent=2)

print("Added scale dependence chart to posts.json")
