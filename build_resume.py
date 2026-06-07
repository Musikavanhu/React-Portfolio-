#!/usr/bin/env python3
"""Build resume PDF with updated Harvard neurotech section."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib import colors

# ── Palette ──
ACCENT = HexColor('#3B82F6')
TEXT_DARK = HexColor('#111827')
TEXT_MID = HexColor('#374151')
TEXT_LIGHT = HexColor('#6B7280')
BG_LIGHT = HexColor('#F9FAFB')

PAGE_W, PAGE_H = letter
MARGIN = 0.75 * inch
CONTENT_W = PAGE_W - 2 * MARGIN

# ── Styles ──
base = getSampleStyleSheet()

name_style = ParagraphStyle('ResumeName', parent=base['Title'], fontSize=22, textColor=TEXT_DARK, fontName='Helvetica-Bold', spaceAfter=2, leading=26)
subtitle_style = ParagraphStyle('ResumeSubtitle', parent=base['Normal'], fontSize=10, textColor=ACCENT, fontName='Helvetica', spaceAfter=6, leading=14)
contact_style = ParagraphStyle('ResumeContact', parent=base['Normal'], fontSize=9, textColor=TEXT_MID, fontName='Helvetica', spaceAfter=12, leading=13)

section_header = ParagraphStyle('SectionHeader', parent=base['Heading2'], fontSize=13, textColor=ACCENT, fontName='Helvetica-Bold', spaceBefore=16, spaceAfter=4, leading=17)

body_style = ParagraphStyle('ResumeBody', parent=base['Normal'], fontSize=9, textColor=TEXT_MID, fontName='Helvetica', leading=13, spaceBefore=0, spaceAfter=2)
bullet_style = ParagraphStyle('ResumeBullet', parent=body_style, leftIndent=16, bulletIndent=4, spaceBefore=2, spaceAfter=1)
detail_style = ParagraphStyle('ResumeDetail', parent=body_style, fontSize=8.5, textColor=TEXT_LIGHT, fontName='Helvetica-Oblique', spaceAfter=1)

school_style = ParagraphStyle('SchoolName', parent=body_style, fontSize=10.5, fontName='Helvetica-Bold', textColor=TEXT_DARK)
date_style = ParagraphStyle('Date', parent=body_style, fontSize=9, fontName='Helvetica', textColor=TEXT_LIGHT, textAlign='right')
link_style = ParagraphStyle('Link', parent=body_style, fontSize=9, textColor=ACCENT, fontName='Helvetica')
quote_style = ParagraphStyle('Quote', parent=body_style, fontSize=9, textColor=TEXT_LIGHT, fontName='Helvetica-Oblique', alignment=1, spaceBefore=6)

# ── Doc ──
output = '/Users/tinomusikavanhu/Desktop/Safehaven/Portfolio/public/resume.pdf'
doc = SimpleDocTemplate(output, pagesize=letter, leftMargin=MARGIN, rightMargin=MARGIN, topMargin=MARGIN, bottomMargin=MARGIN)

elements = []

# ── Header ──
elements.append(Paragraph('Tinotenda Musikavanhu', name_style))
elements.append(Paragraph('Frontend Engineer &middot; AI Integration &middot; Systems Design', subtitle_style))
elements.append(Paragraph('tinotenda@safehavelabs.org &nbsp;&middot;&nbsp; 231-260-6380 &nbsp;&middot;&nbsp; Abilene, TX &nbsp;&middot;&nbsp; Portfolio &nbsp;&middot;&nbsp; LinkedIn &nbsp;&middot;&nbsp; GitHub', contact_style))
elements.append(HRFlowable(width='100%', thickness=1, color=HexColor('#E5E7EB')))
elements.append(Spacer(1, 6))

# ── Professional Summary ──
elements.append(Paragraph('Professional Summary', section_header))
elements.append(HRFlowable(width='100%', thickness=1, color=ACCENT))
summary = """I'm Tino — a full-stack engineer and systems thinker who built my way into tech from first principles.
I founded and built HarmonyFlow, a full-stack SaaS platform for nonprofit operations, entirely on my own — React frontend, Firebase backend, Stripe integrations, and custom mission structures.
I also run an AI automation agency, actively building LLM-powered workflows for local businesses.
My work spans from autonomous AI agents and reinforcement learning to production web applications and real-time data systems.
I don't just write code — I own products from idea to production, and I'm looking for a role where that ownership matters."""
elements.append(Paragraph(summary, body_style))

# ── Education ──
elements.append(Paragraph('Education', section_header))
elements.append(HRFlowable(width='100%', thickness=1, color=ACCENT))

# Harvard (UPDATED)
elements.append(
    Table([
        [Paragraph('<b>Harvard University</b>', school_style),
         Paragraph('2025 &ndash; Present', date_style)]
    ], colWidths=[CONTENT_W*0.65, CONTENT_W*0.35])
)
elements.append(Paragraph('Neurotechnology &mdash; Cognitive Systems &amp; AI', ParagraphStyle('Major', parent=body_style, fontName='Helvetica-Bold', fontSize=9.5, textColor=TEXT_DARK, spaceBefore=2)))
harvard_bullets = [
    'Studying the intersection of neuroscience and artificial intelligence: brain-computer interfaces, neural signal processing, and cognitive computation.',
    'Focusing on how AI systems can model and augment human cognitive processes &mdash; drawing from personal research in latent space reasoning and autoregressive generation.',
    'Applying systems thinking to understand how neural architectures mirror biological cognition, with emphasis on trustworthy, interpretable AI.',
]
for bullet in harvard_bullets:
    elements.append(Paragraph(f'&bull; {bullet}', bullet_style))

# SMU
elements.append(Spacer(1, 4))
elements.append(
    Table([
        [Paragraph('Southern Methodist University', school_style),
         Paragraph('2016 &ndash; 2020', date_style)]
    ], colWidths=[CONTENT_W*0.65, CONTENT_W*0.35])
)
elements.append(Paragraph('Bachelor of Science &mdash; Computer Science', ParagraphStyle('Major', parent=body_style, fontName='Helvetica-Bold', fontSize=9.5, textColor=TEXT_DARK, spaceBefore=2)))
elements.append(Paragraph('Emphasis: Systems Engineering &amp; Artificial Intelligence', detail_style))

# ── Professional Experience ──
elements.append(Paragraph('Professional Experience', section_header))
elements.append(HRFlowable(width='100%', thickness=1, color=ACCENT))

# Safehaven
elements.append(
    Table([
        [Paragraph('Software Engineer &mdash; Safehaven', school_style),
         Paragraph('2023 &ndash; Present', date_style)]
    ], colWidths=[CONTENT_W*0.65, CONTENT_W*0.35])
)
safehaven_bullets = [
    'Develop, maintain, and enhance Safehaven\'s software products using JavaScript and modern web technologies.',
    'Collaborate with cross-functional teams including designers, product managers, and engineers to implement features end-to-end.',
    'Write clean, efficient, maintainable code following industry standards and best practices.',
    'Conduct code reviews and provide constructive feedback to maintain a high-quality codebase.',
    'Ensure optimal performance and thorough testing across platforms and browsers.',
    'Stay current with emerging technologies and integrate advancements into the development pipeline.',
    'Author technical documentation, user guides, and system architecture materials.',
    'Troubleshoot and resolve production issues; provide timely support and root-cause analysis.',
]
for bullet in safehaven_bullets:
    elements.append(Paragraph(f'&bull; {bullet}', bullet_style))

# Protatech
elements.append(Spacer(1, 4))
elements.append(
    Table([
        [Paragraph('Software Engineer &mdash; ProtaTECH', school_style),
         Paragraph('2019 &ndash; 2025', date_style)]
    ], colWidths=[CONTENT_W*0.65, CONTENT_W*0.35])
)
protatech_bullets = [
    'Database analyst and developer with expertise in designing, building, and maintaining complex databases across multiple applications.',
    'Analyzed and forecasted database concerns for the NFL\'s employee management system on-site at the Super Bowl. Executed 5,000+ employee verifications, streamlining 15% of all attendance assignments.',
    'Supported a new Angular-based enterprise application for risk management. Redesigned 75% of the existing database structure; accelerated client delivery by two days.',
    'Streamlined bug resolution in the employee management application directly with clients. Improved response time and remediation speed by 20%.',
    'Collaborated with cross-functional teams to translate business requirements into technical solutions using Angular, SQL, and Swift.',
]
for bullet in protatech_bullets:
    elements.append(Paragraph(f'&bull; {bullet}', bullet_style))

# ── Technical Skills ──
elements.append(Paragraph('Technical Skills', section_header))
elements.append(HRFlowable(width='100%', thickness=1, color=ACCENT))

skills_sections = [
    ('Frontend &amp; Web', 'React, Next.js, TypeScript &middot; Framer Motion, Tailwind CSS &middot; Responsive Design, Web Performance &middot; Vanilla CSS, HTML5, SVG'),
    ('AI &amp; Machine Learning', 'PyTorch, HuggingFace Transformers &middot; LLM Integration (LM Studio, OpenAI) &middot; Reinforcement Learning &middot; Latent Space &amp; Diffusion Models'),
    ('Backend &amp; Systems', 'Node.js, REST APIs, WebSockets &middot; Distributed Systems Architecture &middot; Real-time Data Pipelines'),
    ('Tools &amp; Platforms', 'Git, GitHub, Vercel, Netlify &middot; Apple MPS / GPU Training &middot; Figma, System Design'),
]

for label, skills in skills_sections:
    elements.append(Paragraph(f'<b>{label}</b>', ParagraphStyle('SkillLabel', parent=body_style, fontSize=9.5, spaceBefore=4, spaceAfter=0, fontName='Helvetica-Bold', textColor=TEXT_DARK)))
    elements.append(Paragraph(skills, ParagraphStyle('SkillVal', parent=body_style, fontSize=9, leftIndent=12, textColor=TEXT_MID)))

elements.append(Spacer(1, 4))

# ── Selected Projects ──
elements.append(Paragraph('Selected Projects', section_header))
elements.append(HRFlowable(width='100%', thickness=1, color=ACCENT))

projects = [
    ('AI Gameplay Automation System (Sims 4)', 'Python, React, Computer Vision',
     'Autonomous AI agent that plays and manages a Sims 4 household using computer vision, decision trees, and reinforcement learning. Real-time React dashboard with live game-state telemetry.'),
    ('GenesisTrader', 'Next.js, TypeScript, Coinbase API',
     'AI-powered cryptocurrency trading system with predictive analytics, real-time market intelligence, and high-performance frontend. Integrates local LLM reasoning for trade signal generation.'),
    ('AI Systems Research &mdash; Latent Planning', 'PyTorch, HuggingFace, MPS',
     'Independent research training custom transformer architectures to explore latent planning as a mechanism for improved autoregressive generation quality.'),
    ('HarmonyFlow', 'React, Firebase, Stripe',
     'Full-stack SaaS platform for nonprofit operations: volunteer management, business partnerships, donation processing, and mission tracking. Built and shipped end-to-end.'),
]

for name, tech, desc in projects:
    elements.append(Paragraph(f'<b>{name}</b>', ParagraphStyle('ProjName', parent=body_style, fontSize=9.5, spaceBefore=4, spaceAfter=0)))
    elements.append(Paragraph(tech, detail_style))
    elements.append(Paragraph(f'&bull; {desc}', bullet_style))
    elements.append(Spacer(1, 2))

# ── Selected Publications ──
elements.append(Paragraph('Selected Publications', section_header))
elements.append(HRFlowable(width='100%', thickness=1, color=ACCENT))
elements.append(Paragraph('Full list: zenodo.org/Musikavanhu', link_style))

pubs = [
    '&bull; Musikavanhu, T. (2025). "SolarTherm-CarbCap (STCC): Integrated Solar-Thermal Carbon Capture for Climate Remediation."',
    '&bull; Musikavanhu, T. (2025). "Thermodynamic Validation of Anthropogenic Climate Acceleration."',
    '&bull; Musikavanhu, T. (2025). "Quantum Zeta Field Theory: Unifying Framework for Quantum Fields and Mathematical Structures."',
]
for pub in pubs:
    elements.append(Paragraph(pub, bullet_style))

elements.append(Spacer(1, 4))

# ── Awards ──
elements.append(Paragraph('Awards &amp; Recognition', section_header))
elements.append(HRFlowable(width='100%', thickness=1, color=ACCENT))

awards = [
    'Open Science Impact (2024&ndash;2025): 500+ research downloads across 64+ publications on Zenodo.',
    'NASA Recognition (2025): Acknowledged by former NASA Administrator Dan Goldin for research contributions.',
    'High-Stakes Ops (2019&ndash;2025): Zero-downtime delivery for Super Bowl-scale event deployments at ProtaTECH.',
]
for award in awards:
    elements.append(Paragraph(f'&bull; {award}', bullet_style))

elements.append(Spacer(1, 10))

# ── Footer Quote ──
elements.append(HRFlowable(width='60%', thickness=0.5, color=ACCENT))
elements.append(Paragraph('&ldquo;Building the future &mdash; one component, one model, one breakthrough at a time.&rdquo;', quote_style))

# ── Build ──
doc.build(elements)
print("Resume PDF built successfully.")
print(f"Location: /Users/tinomusikavanhu/Desktop/Safehaven/Portfolio/public/resume.pdf")
