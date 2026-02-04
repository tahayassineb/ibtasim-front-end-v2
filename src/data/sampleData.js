// Sample data for the MVP

export const projects = [
  {
    id: 1,
    title: "Rentrée scolaire pour 50 orphelins",
    shortDescription: "Fournitures scolaires, cartables et uniformes pour enfants orphelins de la région de Casablanca.",
    description: `Cette année, nous avons identifié 50 enfants orphelins qui ont besoin de notre aide pour la rentrée scolaire.

Notre objectif est de fournir à chaque enfant:
- Un cartable complet avec fournitures
- Des livres et manuels scolaires
- Un uniforme neuf
- Des chaussures adaptées

Chaque enfant mérite une éducation. Avec votre soutien, nous pouvons leur offrir les outils nécessaires pour réussir leur année scolaire.

Les enfants sont accompagnés tout au long de l'année par notre équipe d'éducateurs et bénéficient également d'un suivi scolaire personnalisé.`,
    category: "تعليم",
    goalAmount: 25000,
    raisedAmount: 19500,
    donorsCount: 23,
    daysLeft: 15,
    status: "active",
    featured: true,
    createdAt: "2024-01-15",
    endDate: "2024-02-28",
    mainImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400",
      "https://images.unsplash.com/photo-1427504743383-6f7f53df8d8e?w=400",
    ],
    updates: [
      {
        id: 1,
        date: "2024-01-18",
        title: "Achat des fournitures effectué",
        content: "Nous avons finalisé l'achat des fournitures scolaires pour les 50 enfants. Les cartables sont commandés et arriveront la semaine prochaine.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      },
      {
        id: 2,
        date: "2024-01-15",
        title: "Lancement de la collecte",
        content: "Nous lançons officiellement notre campagne de collecte pour la rentrée scolaire 2024. Merci pour votre générosité !",
      },
    ],
  },
  {
    id: 2,
    title: "Construction d'un puits - Village Ait Omar",
    shortDescription: "Construction d'un puits d'eau potable pour un village rural en province d'Errachidia.",
    description: `Le village d'Ait Omar, situé dans une région montagneuse isolée, n'a pas accès à l'eau potable. Les habitants parcourent des kilomètres chaque jour pour chercher de l'eau.

Ce projet comprend:
- Forage d'un puits profond
- Installation d'une pompe solaire
- Construction d'un réservoir
- Points d'eau dans le village

Ce puits changera la vie de plus de 300 habitants, notamment les femmes et les enfants qui consacrent des heures chaque jour à chercher de l'eau.`,
    category: "مجتمع",
    goalAmount: 50000,
    raisedAmount: 50000,
    donorsCount: 45,
    daysLeft: 0,
    status: "funded",
    featured: false,
    createdAt: "2023-12-01",
    endDate: "2024-01-31",
    mainImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
    gallery: [],
    updates: [
      {
        id: 1,
        date: "2024-01-31",
        title: "🎉 Objectif atteint !",
        content: "Grâce à votre générosité, nous avons atteint notre objectif de 50 000 DH ! Les travaux commenceront début février.",
      },
    ],
  },
  {
    id: 3,
    title: "Aide alimentaire Ramadan 2024",
    shortDescription: "Distribution de paniers alimentaires pour 100 familles défavorisées pendant le mois sacré.",
    description: `Pendant le mois sacré du Ramadan, nous distribuons des paniers alimentaires complets aux familles les plus démunies.

Chaque panier contient:
- 10kg de sucre
- 5kg de riz
- 5L d'huile
- 2kg de dattes
- Lait en poudre
- Café et thé
- Produits d'hygiène

Les bénéficiaires sont sélectionnés en fonction de leurs besoins réels, avec un suivi social rigoureux.`,
    category: "إغاثة غذائية",
    goalAmount: 30000,
    raisedAmount: 32500,
    donorsCount: 67,
    daysLeft: 0,
    status: "finished",
    featured: false,
    createdAt: "2024-03-01",
    endDate: "2024-03-10",
    mainImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=400",
    ],
    updates: [
      {
        id: 1,
        date: "2024-03-15",
        title: "Distribution terminée avec succès",
        content: "Nous avons distribué 100 paniers alimentaires à 100 familles. Merci à tous les donateurs ! Les photos de la distribution sont disponibles.",
        image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=400",
      },
    ],
  },
  {
    id: 4,
    title: "Rénovation du centre d'accueil",
    shortDescription: "Rénovation complète de notre centre d'accueil pour enfants en difficulté à Fès.",
    description: `Notre centre d'accueil à Fès a besoin d'une rénovation majeure. Les installations datent de plus de 20 ans et ne répondent plus aux normes actuelles.

Le projet comprend:
- Rénovation des dortoirs
- Construction d'une cantine moderne
- Aménagement d'une salle d'études
- Création d'un espace de jeux
- Travaux d'isolation et de chauffage

Ce centre accueille 30 enfants en permanence et leur offre un foyer sécurisé.`,
    category: "بنية تحتية",
    goalAmount: 100000,
    raisedAmount: 45000,
    donorsCount: 12,
    daysLeft: 0,
    status: "stopped",
    featured: false,
    createdAt: "2024-01-10",
    endDate: "2024-06-30",
    mainImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    gallery: [],
    updates: [],
  },
  {
    id: 5,
    title: "Formation professionnelle jeunes",
    shortDescription: "Formation en menuiserie et électricité pour 20 jeunes sans emploi de la région de Tanger.",
    description: `Ce programme offre une formation professionnelle de 6 mois à des jeunes en situation de précarité.

Formations proposées:
- Menuiserie aluminium
- Électricité bâtiment
- Plomberie
- Informatique (bureautique)

À l'issue de la formation, les diplômés reçoivent:
- Un certificat reconnu
- Un kit de démarrage professionnel
- Un accompagnement vers l'emploi ou la création d'entreprise

L'objectif est de leur donner les moyens de s'autonomiser durablement.`,
    category: "تكوين",
    goalAmount: 40000,
    raisedAmount: 12000,
    donorsCount: 8,
    daysLeft: 0,
    status: "expired",
    featured: false,
    createdAt: "2023-11-01",
    endDate: "2024-01-31",
    mainImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
    gallery: [],
    updates: [],
  },
  {
    id: 6,
    title: "Urgence: Soutien famille sinistrée",
    shortDescription: "Aide d'urgence pour une famille qui a tout perdu dans un incendie à Meknès.",
    description: `Une famille de 6 personnes a tout perdu dans un incendie qui a détruit leur maison à Meknès.

Les fonds serviront à:
- Achat de vêtements et chaussures
- Achat de linge de maison
- Achat de matériel de cuisine
- Contribution à la relocation temporaire

Nous avons besoin de votre aide urgente pour leur permettre de se reconstruire.`,
    category: "استعجالي",
    goalAmount: 15000,
    raisedAmount: 12750,
    donorsCount: 18,
    daysLeft: 5,
    status: "active",
    featured: true,
    createdAt: "2024-01-25",
    endDate: "2024-02-08",
    mainImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    gallery: [],
    updates: [
      {
        id: 1,
        date: "2024-01-26",
        title: "Premiers dons reçus",
        content: "Merci aux premiers donateurs ! Nous avons déjà pu acheter des vêtements pour les enfants.",
      },
    ],
  },
];

export const donors = [
  {
    id: 1,
    name: "Ahmed Mansouri",
    phone: "+212 612 345 678",
    email: "ahmed.mansouri@email.com",
    totalDonated: 2500,
    donationCount: 5,
    memberSince: "2023-06-15",
    lastDonation: "2024-01-15",
  },
  {
    id: 2,
    name: "Fatima Benali",
    phone: "+212 623 456 789",
    email: "fatima.benali@email.com",
    totalDonated: 800,
    donationCount: 3,
    memberSince: "2023-09-20",
    lastDonation: "2024-01-15",
  },
  {
    id: 3,
    name: "Karim Lahlou",
    phone: "+212 634 567 890",
    email: "karim.lahlou@email.com",
    totalDonated: 1000,
    donationCount: 1,
    memberSince: "2024-01-14",
    lastDonation: "2024-01-14",
  },
  {
    id: 4,
    name: "Sara Tazi",
    phone: "+212 645 678 901",
    email: "sara.tazi@email.com",
    totalDonated: 600,
    donationCount: 2,
    memberSince: "2023-11-10",
    lastDonation: "2024-01-13",
  },
  {
    id: 5,
    name: "Mohammed Alami",
    phone: "+212 656 789 012",
    email: "m.alami@email.com",
    totalDonated: 300,
    donationCount: 2,
    memberSince: "2024-01-10",
    lastDonation: "2024-01-14",
  },
];

export const donations = [
  {
    id: 1,
    donorId: 1,
    donorName: "Ahmed Mansouri",
    projectId: 1,
    projectName: "Rentrée scolaire pour 50 orphelins",
    amount: 500,
    method: "card",
    status: "verified",
    reference: null,
    date: "2024-01-15T14:30:00",
    isAnonymous: false,
  },
  {
    id: 2,
    donorId: 2,
    donorName: "Fatima Benali",
    projectId: 1,
    projectName: "Rentrée scolaire pour 50 orphelins",
    amount: 200,
    method: "transfer",
    status: "pending",
    reference: "DON-2024-0847",
    date: "2024-01-15T10:15:00",
    isAnonymous: false,
    receiptUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
  },
  {
    id: 3,
    donorId: 3,
    donorName: "Karim Lahlou",
    projectId: 2,
    projectName: "Construction d'un puits - Village Ait Omar",
    amount: 1000,
    method: "transfer",
    status: "pending",
    reference: "DON-2024-0845",
    date: "2024-01-14T16:00:00",
    isAnonymous: false,
    receiptUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
  },
  {
    id: 4,
    donorId: null,
    donorName: "Anonyme",
    projectId: 3,
    projectName: "Aide alimentaire Ramadan 2024",
    amount: 100,
    method: "card",
    status: "verified",
    reference: null,
    date: "2024-01-14T12:00:00",
    isAnonymous: true,
  },
  {
    id: 5,
    donorId: 4,
    donorName: "Sara Tazi",
    projectId: 1,
    projectName: "Rentrée scolaire pour 50 orphelins",
    amount: 300,
    method: "transfer",
    status: "failed",
    reference: "DON-2024-0840",
    date: "2024-01-13T09:00:00",
    isAnonymous: false,
    failureReason: "Référence manquante",
  },
  {
    id: 6,
    donorId: 5,
    donorName: "Mohammed Alami",
    projectId: 1,
    projectName: "Rentrée scolaire pour 50 orphelins",
    amount: 200,
    method: "transfer",
    status: "pending",
    reference: "DON-2024-0842",
    date: "2024-01-14T11:30:00",
    isAnonymous: false,
    receiptUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
  },
];

export const stats = {
  totalCollected: 245680,
  projectsCompleted: 12,
  beneficiaries: 1250,
  totalDonors: 247,
};

export const associationInfo = {
  name: "ITASSIM",
  arabicName: "إتاسيم",
  foundedYear: 2018,
  registrationNumber: "123456-RC",
  address: "123 Rue Mohammed V, Casablanca, Maroc",
  phone: "+212 522 123 456",
  email: "contact@itassim.ma",
  whatsapp: "+212 612 345 789",
  bankName: "CIH Bank",
  accountHolder: "ITASSIM",
  rib: "230 780 0123456789012345 67",
  description: "جمعية خيرية غير ربحية مكرسة لدعم الأطفال الأيتام والعائلات المحتاجة في المغرب.",
  mission: `مهمتنا هي تقديم دعم ملموس ومستدام للأطفال الأيتام والعائلات الضعيفة في المغرب.

نؤمن بأن كل طفل يستحق التعليم، والمنزل الآمن، والمستقبل الواعد.`,
  socialLinks: {
    facebook: "https://facebook.com/itassim",
    instagram: "https://instagram.com/itassim",
    whatsapp: "https://wa.me/212612345789",
  },
};

export const currentUser = {
  id: 1,
  name: "Ahmed Mansouri",
  phone: "+212 612 345 678",
  email: "ahmed.mansouri@email.com",
  memberSince: "2023-06-15",
  donations: [1, 7, 12],
  followedProjects: [1, 2],
  preferences: {
    whatsappUpdates: true,
    emailNews: true,
  },
};
