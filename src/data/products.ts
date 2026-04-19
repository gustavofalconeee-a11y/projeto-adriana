
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    personalizationEnabled: boolean;
    colors: { name: string }[];
    directCheckoutLink?: string;
}

const colorGroups = {
    standard: ['Prata', 'Dourado', 'Preto', 'Azul Marinho', 'Verde Musgo', 'Verde Bebê', 'Vermelho', 'Vinho', 'Azul Bic', 'Marrom', 'Caramelo', 'Marfim', 'Rosa Seco', 'Pink'].map(n => ({ name: n })),
    whiteKit: ['Marfim', 'Caramelo', 'Azul Marinho', 'Verde Musgo', 'Branco', 'Pink', 'Marrom'].map(n => ({ name: n })),
    bella: ['Bege', 'Verde Claro', 'Rosa', 'Vermelho', 'Preto', 'Azul Marinho', 'Verde Musgo', 'Lilás', 'Cinza'].map(n => ({ name: n })),
    verao: ['Amarelo', 'Laranja', 'Verde Claro', 'Branco', 'Preto', 'Azul'].map(n => ({ name: n }))
}

export const products: Product[] = [
    {
        id: "necessaire-box-g",
        name: 'Necessaire Box G',
        price: 60.00,
        description: 'Necessaire estruturada e espaçosa, perfeita para organizar todos os seus itens essenciais com elegância e praticidade.',
        images: ['/images/Necessaire-Box-G.jpeg', '/images/Necessaire-Box-G2.jpeg', '/images/Necessaire-Box-G3.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "porta-manicure",
        name: 'Porta manicure',
        price: 51.00,
        description: 'Mantenha seus itens de manicure organizados de forma prática e estilosa. Ideal para carregar na bolsa ou viagens.',
        images: ['/images/Porta-manicure.jpeg', '/images/Porta-manicure-por-dentro.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "porta-garrafa-vinho",
        name: 'Porta garrafa/vinho',
        price: 40.00,
        description: 'Acessório sofisticado para transportar sua garrafa com segurança e estilo. Ótima opção para presentear.',
        images: ['/images/Porta-garrafa-vinho.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "kit-essencial-white",
        name: 'Kit essencial White',
        price: 90.00,
        description: 'Um conjunto clean e sofisticado para quem busca organização com um toque de minimalismo e luxo.',
        images: ['/images/Kit-essencial-white.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.whiteKit
    },
    {
        id: "kit-bella",
        name: 'Kit bella',
        price: 60.00,
        description: 'Conjunto versátil e charmoso, ideal para o dia a dia, com cores modernas e acabamento premium.',
        images: ['/images/Kit-bella.jpeg', '/images/Kit-bella2.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.bella
    },
    {
        id: "kit-viajem",
        name: 'Kit viajem',
        price: 160.00,
        description: 'O parceiro ideal para suas aventuras. Kit completo para manter tudo no lugar durante suas viagens.',
        images: ['/images/Kit-viajem.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "porta-chinelo-trip",
        name: 'Porta chinelo trip',
        price: 46.00,
        description: 'Praticidade para suas viagens. Carregue seu chinelo de forma higiênica e organizada na mala.',
        images: ['/images/Porta-chinelo-trip.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "frasqueira-cristal-lux",
        name: 'Frasqueira Cristal Lux',
        price: 73.00,
        description: 'Transparência e luxo se encontram nesta frasqueira, permitindo visualizar seus itens com facilidade.',
        images: ['/images/Frasqueira-Cristal-Lux.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.bella
    },
    {
        id: "maleta-multiuso-cristal",
        name: 'Maleta multiuso Cristal',
        price: 112.00,
        description: 'Organização máxima com visibilidade. Maleta resistente e elegante para diversos usos.',
        images: ['/images/Maleta-multiuso-Cristal.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "necessaire-princesinha-verao",
        name: 'Necessaire Princesinha do Verão',
        price: 65.00,
        description: 'Cores vibrantes para brilhar na estação mais quente do ano. Compacta e estilosa.',
        images: ['/images/Necessaire-Princesinha-do-Verão.jpeg', '/images/Necessaire-Princesinha-do-Verão2.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.verao
    },
    {
        id: "bolsa-praia-alca-mao",
        name: 'Bolsa Praia Alça de mão',
        price: 189.00,
        description: 'A bolsa perfeita para dias de sol. Ampla, resistente e com design exclusivo Alora.',
        images: ['/images/Bolsa-Praia-Alça-de-mão.jpeg'],
        personalizationEnabled: true,
        colors: [{ name: 'Natural' }]
    },
    {
        id: "farmacinha-bolsa",
        name: 'Farmacinha de bolsa',
        price: 54.00,
        description: 'Leve seus medicamentos essenciais com segurança e organização onde quer que você vá.',
        images: ['/images/Farmacinha-de-bolsa.jpeg', '/images/Farmacinha-de-bolsa-dentro.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "pack-jogos",
        name: 'Pack para jogos',
        price: 35.00,
        description: 'Ideal para organizar baralhos e pequenos itens de jogos. Praticidade em qualquer lugar.',
        images: ['/images/Bolsa-Pack-para-jogos.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "necessaire-clean",
        name: 'Necessaire Clean',
        price: 40.00,
        description: 'Design minimalista e elegante. A necessaire perfeita para quem prefere a simplicidade com luxo.',
        images: ['/images/Necessaire-Clean.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.whiteKit
    },
    {
        id: "necessaire-slim-dupla",
        name: 'Necessaire Slim dupla',
        price: 36.00,
        description: 'Dois compartimentos em um design fino. Organize seus itens por categoria com facilidade.',
        images: ['/images/Necessaire-Slim-dupla.jpeg', '/images/Necessaire-Slim-dupla-dentro.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "necessaire-voucher",
        name: 'Necessaire Voucher',
        price: 25.00,
        description: 'Compacta e ideal para vouchers, cartões e pequenos documentos. Organização que cabe em qualquer lugar.',
        images: ['/images/Necessaire-Voucher.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.whiteKit
    },
    {
        id: "clutch",
        name: 'Clutch',
        price: 52.00,
        description: 'A peça que faltava para elevar seu look. Elegante e atemporal, ideal para eventos e saídas.',
        images: ['/images/Clutch.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "tag-mala",
        name: 'Tag de mala',
        price: 38.00,
        description: 'Identifique sua mala com luxo e sofisticação. Feita para durar e destacar sua bagagem.',
        images: ['/images/Tag-de-mala.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.whiteKit
    },
    {
        id: "kit-elegance",
        name: 'Kit Elegance',
        price: 160.00,
        description: 'O presente perfeito ou o mimo que você merece. Kit completo com acessórios essenciais em acabamento premium.',
        images: ['/images/Kit-elegance.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "kit-essencial",
        name: 'Kit Essencial',
        price: 112.00,
        description: 'Tudo o que você precisa em um só lugar. Peças fundamentais para o dia a dia da mulher moderna.',
        images: ['/images/Kit-Essencial.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "kit-multiuso",
        name: 'Kit Multiuso',
        price: 72.00,
        description: 'Conjunto versátil para diversas utilidades, mantendo seus itens organizados com estilo e praticidade.',
        images: ['/images/Kit-Multiuso.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "super-bag-alora",
        name: 'Super Bag Alora',
        price: 160.00,
        description: 'A bolsa definitiva para quem precisa de espaço sem abrir mão do luxo. Feita com materiais ultra resistentes.',
        images: ['/images/Super-Bag-Alora.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.whiteKit
    },
    {
        id: "super-bag-alora-pink",
        name: 'Super Bag Alora Pink',
        price: 190.00,
        description: 'Versão exclusiva em tom Pink da nossa Super Bag. Para quem quer destacar sua personalidade com elegância.',
        images: ['/images/Super-Bag-Alora-Pink.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    },
    {
        id: "necessaire-paris",
        name: 'Necessaire Paris',
        price: 60.00,
        description: 'Necessaire sofisticada e compacta, ideal para viagens e organização diária. Design inspirado na elegância parisiense.',
        images: ['/images/necessaire-Paris-new.jpeg', '/images/necessaire-Paris2-new.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.whiteKit
    },
    {
        id: "necessaire-ieda",
        name: 'Necessaire Ieda',
        price: 92.00,
        description: 'Necessaire estruturada com amplo espaço interno. Perfeita para cosméticos e itens de higiene pessoal.',
        images: ['/images/necessaire-leda.jpeg', '/images/necessaire-leda2.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.bella
    },
    {
        id: "necessaire-vintage",
        name: 'Necessaire Vintage',
        price: 60.00,
        description: 'Um toque retrô para sua coleção. Design clássico que nunca sai de moda, com durabilidade moderna.',
        images: ['/images/Necessaire-Vintage.jpeg'],
        personalizationEnabled: true,
        colors: colorGroups.standard
    }
];
