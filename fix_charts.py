import json

with open('/Users/tinomusikavanhu/Desktop/Safehaven/Portfolio/data/posts.json', 'r') as f:
    posts = json.load(f)

for post in posts:
    if post['slug'] == 'architecture-of-the-ai-dollar':
        for block in post['content']:
            if block['type'] == 'chart' and block['chartData'].get('type') == 'infographic':
                if 'petro' in block['chartData']['data']:
                    block['chartData']['data']['left'] = block['chartData']['data'].pop('petro')
                    block['chartData']['data']['right'] = block['chartData']['data'].pop('ai')

    if post['slug'] == 'biomimetic-error-mitigation':
        new_content = []
        for i, block in enumerate(post['content']):
            # insert horizontal chart before Scale Dependence Analysis
            if block['type'] == 'heading' and 'Scale Dependence Analysis' in block['text']:
                new_content.append({
                    "type": "chart",
                    "text": "",
                    "chartData": {
                        "title": "Decoding Performance at Eb/N0 = 3.0 dB (Lower WER is Better)",
                        "type": "horizontal",
                        "data": [
                            {
                                "category": "Small-Array Topologies (n=24)",
                                "values": [
                                    { "label": "Random LDPC (Matched Degree)", "value": 137, "displayValue": "0.137 WER" },
                                    { "label": "Biomimetic QEC (Structured 2D)", "value": 74, "displayValue": "0.074 WER" }
                                ]
                            }
                        ]
                    }
                })
            # insert infographic before 5. Small-Array Performance (n=24)
            if block['type'] == 'heading' and 'Small-Array Performance' in block['text']:
                new_content.append({
                    "type": "chart",
                    "text": "",
                    "chartData": {
                        "type": "infographic",
                        "title": "Architectural Cost-Benefit Profile",
                        "description": "At rate R=2/3, the biomimetic architecture matches or exceeds majority vote structures while requiring half the physical nodes.",
                        "data": {
                            "leftTitle": "Naive Majority Vote",
                            "left": [
                                { "label": "Physical Nodes (n)", "value": "48 nodes" },
                                { "label": "Code Rate (R)", "value": "0.33 (Highly Inefficient)" },
                                { "label": "Decoding Cost", "value": "Linear Summation (O(1))" }
                            ],
                            "rightTitle": "Biomimetic QEC Product Code",
                            "right": [
                                { "label": "Physical Nodes (n)", "value": "24 nodes (Half the hardware)" },
                                { "label": "Code Rate (R)", "value": "0.67 (Highly Efficient)" },
                                { "label": "Decoding Cost", "value": "Min-Sum BP (Iterative)" }
                            ]
                        }
                    }
                })
            
            new_content.append(block)
        post['content'] = new_content

with open('/Users/tinomusikavanhu/Desktop/Safehaven/Portfolio/data/posts.json', 'w') as f:
    json.dump(posts, f, indent=2)

print("Updated charts in posts.json")
