import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedItems = [
  {
    sku: "WM-LOG-MX3",
    name: "Logitech MX Master 3S",
    namePT: "Logitech MX Master 3S",
    category: "Peripherals",
    categoryPT: "Periféricos",
    description: "Wireless ergonomic mouse with precision tracking.",
    descriptionPT: "Mouse sem fio ergonômico com rastreamento preciso.",
    quantity: 42,
    lowStockThreshold: 10,
  },
  {
    sku: "KB-KEY-K2",
    name: "Keychron K2 Mechanical Keyboard",
    namePT: "Teclado Mecânico Keychron K2",
    category: "Peripherals",
    categoryPT: "Periféricos",
    description: "Compact 75% layout keyboard with hot-swappable switches.",
    descriptionPT: "Teclado compacto 75% com switches hot-swappable.",
    quantity: 28,
    lowStockThreshold: 8,
  },
  {
    sku: "MON-DELL-U2723",
    name: "Dell UltraSharp 27\" 4K Monitor",
    namePT: "Monitor Dell UltraSharp 27\" 4K",
    category: "Displays",
    categoryPT: "Monitores",
    description: "27-inch IPS display with USB-C hub.",
    descriptionPT: "Tela IPS de 27 polegadas com hub USB-C.",
    quantity: 15,
    lowStockThreshold: 5,
  },
  {
    sku: "HD-WD-4TB",
    name: "WD Red Plus 4TB NAS HDD",
    namePT: "HD WD Red Plus 4TB para NAS",
    category: "Storage",
    categoryPT: "Armazenamento",
    description: "3.5\" NAS hard drive optimized for 24/7 workloads.",
    descriptionPT: "HD NAS 3.5\" otimizado para uso contínuo 24/7.",
    quantity: 36,
    lowStockThreshold: 12,
  },
  {
    sku: "SSD-SAM-990",
    name: "Samsung 990 Pro 1TB NVMe",
    namePT: "Samsung 990 Pro 1TB NVMe",
    category: "Storage",
    categoryPT: "Armazenamento",
    description: "PCIe Gen4 NVMe SSD for high-performance systems.",
    descriptionPT: "SSD NVMe PCIe Gen4 para sistemas de alto desempenho.",
    quantity: 64,
    lowStockThreshold: 15,
  },
  {
    sku: "NET-UNI-U6",
    name: "Ubiquiti UniFi U6 Lite AP",
    namePT: "Access Point Ubiquiti UniFi U6 Lite",
    category: "Networking",
    categoryPT: "Rede",
    description: "Dual-band Wi-Fi 6 access point for office coverage.",
    descriptionPT: "Access point Wi-Fi 6 dual band para cobertura corporativa.",
    quantity: 22,
    lowStockThreshold: 6,
  },
  {
    sku: "CBL-ETH-CAT6-3M",
    name: "Cat6 Ethernet Cable 3m",
    namePT: "Cabo Ethernet Cat6 3m",
    category: "Networking",
    categoryPT: "Rede",
    description: "Shielded patch cable for rack and desk connections.",
    descriptionPT: "Cabo patch blindado para rack e mesa.",
    quantity: 120,
    lowStockThreshold: 30,
  },
  {
    sku: "PWR-APC-1500",
    name: "APC Back-UPS 1500VA",
    namePT: "Nobreak APC Back-UPS 1500VA",
    category: "Power",
    categoryPT: "Energia",
    description: "Line-interactive UPS for workstations and network gear.",
    descriptionPT: "Nobreak line-interactive para estações e rede.",
    quantity: 9,
    lowStockThreshold: 4,
  },
  {
    sku: "RACK-SHELF-1U",
    name: "1U Rack Mount Shelf",
    namePT: "Prateleira Rack 1U",
    category: "Rack Equipment",
    categoryPT: "Equipamentos de Rack",
    description: "Ventilated steel shelf for 19-inch server racks.",
    descriptionPT: "Prateleira de aço ventilada para racks 19 polegadas.",
    quantity: 18,
    lowStockThreshold: 5,
  },
  {
    sku: "TOOL-SCREW-KIT",
    name: "Precision Screwdriver Kit",
    namePT: "Kit de Chaves de Precisão",
    category: "Tools",
    categoryPT: "Ferramentas",
    description: "24-piece kit for laptop and electronics repair.",
    descriptionPT: "Kit com 24 peças para reparo de notebooks e eletrônicos.",
    quantity: 47,
    lowStockThreshold: 10,
  },
  {
    sku: "LBL-BRO-TAPE",
    name: "Brother P-Touch Label Tape",
    namePT: "Fita para Rotulador Brother P-Touch",
    category: "Office Supplies",
    categoryPT: "Material de Escritório",
    description: "12mm black-on-white laminated labeling tape.",
    descriptionPT: "Fita laminada 12mm preto sobre branco.",
    quantity: 85,
    lowStockThreshold: 20,
  },
  {
    sku: "CAM-LOG-C920",
    name: "Logitech C920 HD Webcam",
    namePT: "Webcam Logitech C920 HD",
    category: "Peripherals",
    categoryPT: "Periféricos",
    description: "1080p webcam with stereo microphones.",
    descriptionPT: "Webcam 1080p com microfones estéreo.",
    quantity: 31,
    lowStockThreshold: 8,
  },
  {
    sku: "SPK-JBL-305",
    name: "JBL 305P MkII Studio Monitor",
    namePT: "Monitor de Estúdio JBL 305P MkII",
    category: "Audio",
    categoryPT: "Áudio",
    description: "Powered 5-inch reference speaker for editing suites.",
    descriptionPT: "Caixa ativa de 5 polegadas para suítes de edição.",
    quantity: 12,
    lowStockThreshold: 4,
  },
  {
    sku: "BAT-AA-48PK",
    name: "AA Alkaline Batteries 48-Pack",
    namePT: "Pilhas Alcalinas AA Pacote com 48",
    category: "Office Supplies",
    categoryPT: "Material de Escritório",
    description: "Bulk pack for remotes, sensors, and backup devices.",
    descriptionPT: "Pacote para controles, sensores e dispositivos de backup.",
    quantity: 6,
    lowStockThreshold: 12,
  },
  {
    sku: "CLN-LCD-500ML",
    name: "Screen Cleaning Solution 500ml",
    namePT: "Solução de Limpeza para Telas 500ml",
    category: "Office Supplies",
    categoryPT: "Material de Escritório",
    description: "Alcohol-free cleaner safe for monitors and laptops.",
    descriptionPT: "Limpador sem álcool seguro para monitores e notebooks.",
    quantity: 53,
    lowStockThreshold: 15,
  },
] as const;

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  console.log("Starting database seed...");
  await prisma.item.deleteMany();

  for (const item of seedItems) {
    await prisma.item.upsert({
      where: { sku: item.sku },
      update: {
        name: item.name,
        namePT: item.namePT,
        category: item.category,
        categoryPT: item.categoryPT,
        description: item.description,
        descriptionPT: item.descriptionPT,
        quantity: item.quantity,
        lowStockThreshold: item.lowStockThreshold,
      },
      create: item,
    });
  }

  console.log(`Seeded ${seedItems.length} inventory items.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
