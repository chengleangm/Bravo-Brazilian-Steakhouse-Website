import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

type MenuItem = {
  name: string
  description: string
  price: string
  image?: string
}

type MenuSection = {
  id: string
  eyebrow: string
  title: string
  description: string
  items: MenuItem[]
}

const heroImage =
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=2000&q=90'

const menuCtaHighlights = [
  { label: 'Buffet', value: 'Lunch and dinner' },
  { label: 'Grill', value: 'Fresh from the fire' },
  { label: 'Groups', value: 'Tables for celebrations' },
]

const menuSections: MenuSection[] = [
  {
    id: 'buffet',
    eyebrow: 'Signature Service',
    title: 'Brazilian BBQ Buffet',
    description:
      'A generous churrascaria spread with grilled meats, fresh sides, salads, sauces, and dessert bites.',
    items: [
      {
        name: 'Lunch Buffet',
        description: 'Fresh salads, hot dishes, grilled favourites, sauces, and dessert bites.',
        price: '$12.90',
        image:
          'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Dinner Buffet',
        description: 'Expanded churrasco cuts with buffet sides and chef-selected specials.',
        price: '$18.90',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Weekend Special Buffet',
        description: 'A richer weekend spread for families, groups, and celebrations.',
        price: '$22.90',
        image:
          'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Weekday Rodizio',
        description: 'Rotating grilled cuts served with buffet sides and house sauces.',
        price: '$16.90',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Premium Cuts Buffet',
        description: 'A fuller buffet with picanha, ribeye, sausage, chicken, and ribs.',
        price: '$24.90',
        image:
          'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Family Churrasco Buffet',
        description: 'Shared buffet service for four with grilled meats and fresh sides.',
        price: '$49.90',
        image:
          'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Salad Bar Buffet',
        description: 'Fresh greens, grilled vegetables, rice, beans, sauces, and breads.',
        price: '$8.90',
        image:
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Celebration Buffet',
        description: 'A generous party spread with chef-selected grill specials.',
        price: '$27.90',
        image:
          'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Kids Buffet',
        description: 'Smaller buffet plate with gentle grill favourites and dessert.',
        price: '$7.90',
        image:
          'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=90',
      },
    ],
  },
  {
    id: 'grill',
    eyebrow: 'Skewers and Steaks',
    title: 'From the Grill',
    description:
      'Premium cuts seasoned simply, grilled hot, rested briefly, and served with smoky edges.',
    items: [
      {
        name: 'Picanha Steak',
        description: 'Brazilian top sirloin cap with a juicy fat edge.',
        price: '$16.90',
        image:
          'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Churrasco Beef',
        description: 'Classic Brazilian beef, sea salt, open flame.',
        price: '$13.90',
        image:
          'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Ribeye Skewer',
        description: 'Rich ribeye grilled fast and sliced to order.',
        price: '$18.90',
        image:
          'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Pork Ribs',
        description: 'Slow-grilled ribs with smoky barbecue glaze.',
        price: '$12.90',
        image:
          'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Garlic Picanha',
        description: 'Picanha brushed with roasted garlic butter and sea salt.',
        price: '$17.90',
        image:
          'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Beef Short Rib',
        description: 'Deeply marbled short rib grilled until smoky and tender.',
        price: '$19.90',
        image:
          'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Lamb Churrasco',
        description: 'Herb-marinated lamb with charred edges and warm spice.',
        price: '$18.90',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Smoked Brisket',
        description: 'Slow-smoked beef brisket finished over open flame.',
        price: '$15.90',
        image:
          'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Mixed Grill Plate',
        description: 'Picanha, sausage, chicken, ribs, rice, salad, and chimichurri.',
        price: '$21.90',
        image:
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=90',
      },
    ],
  },
  {
    id: 'chicken-pork',
    eyebrow: 'Comfort Cuts',
    title: 'Chicken and Pork',
    description:
      'Warm, familiar grill favourites with marinades, crisp skin, and caramelized edges.',
    items: [
      {
        name: 'Garlic Chicken',
        description: 'Marinated chicken grilled crisp with citrus and herbs.',
        price: '$9.90',
        image:
          'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Brazilian Sausage',
        description: 'Smoky sausage with farofa-style crunch.',
        price: '$7.90',
        image:
          'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Pork Belly Skewer',
        description: 'Charred pork belly with tender middle and crisp edge.',
        price: '$9.90',
        image:
          'https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Citrus Chicken Thigh',
        description: 'Juicy chicken thigh with lime, garlic, and paprika.',
        price: '$8.90',
        image:
          'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Honey Chilli Wings',
        description: 'Crisp wings tossed with honey, chilli, and smoked salt.',
        price: '$7.90',
        image:
          'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Pork Shoulder Steak',
        description: 'Tender pork shoulder grilled with herbs and garlic.',
        price: '$10.90',
        image:
          'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Smoked Ham Skewer',
        description: 'Carved ham with caramelized edges and pineapple glaze.',
        price: '$8.90',
        image:
          'https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Chicken Hearts',
        description: 'Classic churrasco-style chicken hearts with sea salt.',
        price: '$7.50',
        image:
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Pork Sausage Duo',
        description: 'Two grilled sausages with chimichurri and warm farofa.',
        price: '$8.50',
        image:
          'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=900&q=90',
      },
    ],
  },
  {
    id: 'seafood',
    eyebrow: 'Bright and Flame-Grilled',
    title: 'Seafood',
    description:
      'Garlic, lime, herbs, and open flame for guests who want lighter shared plates.',
    items: [
      {
        name: 'Grilled Prawns',
        description: 'Prawns grilled with chilli, lime, and garlic.',
        price: '$13.90',
        image:
          'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Garlic Butter Fish',
        description: 'Flaky fish with herbs and warm garlic butter.',
        price: '$11.90',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Seafood BBQ Plate',
        description: 'A shared plate of flame-grilled seafood.',
        price: '$21.90',
        image:
          'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Lime Grilled Salmon',
        description: 'Salmon grilled with lime, herbs, and garlic butter.',
        price: '$14.90',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Chilli Calamari',
        description: 'Tender calamari with chilli, lemon, and charred herbs.',
        price: '$10.90',
        image:
          'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Garlic Mussels',
        description: 'Mussels cooked with garlic butter and fresh parsley.',
        price: '$9.90',
        image:
          'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Seafood Skewer',
        description: 'Prawn, fish, and squid grilled with citrus seasoning.',
        price: '$15.90',
        image:
          'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Coconut Fish Curry',
        description: 'Warm fish curry with coconut, lime, and Brazilian spice.',
        price: '$12.90',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=90',
      },
      {
        name: 'Prawn Rice Bowl',
        description: 'Garlic prawns over Brazilian rice with herbs and chilli.',
        price: '$11.90',
        image:
          'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=90',
      },
    ],
  },
  {
    id: 'sides-drinks',
    eyebrow: 'Complete the Table',
    title: 'Sides and Drinks',
    description:
      'Fresh, hot, and colourful additions that round out the grill service.',
    items: [
      {
        name: 'Brazilian Rice',
        description: 'Garlic rice with herbs, ideal beside grilled beef and sausage.',
        price: '$2.50',
      },
      {
        name: 'House Sauces',
        description: 'Chimichurri, chilli-lime, garlic butter, and barbecue sauce.',
        price: '$1.50',
      },
      {
        name: 'Brazilian Mocktail',
        description: 'Citrus, mint, tropical fruit, and crushed ice.',
        price: '$4.90',
      },
      {
        name: 'Fresh Juice',
        description: 'Mango, passionfruit, orange, or mixed tropical.',
        price: '$3.50',
      },
      {
        name: 'Garlic Bread',
        description: 'Warm toasted bread with garlic butter and herbs.',
        price: '$3.50',
      },
      {
        name: 'Farofa Crunch',
        description: 'Toasted cassava flour with herbs and smoky seasoning.',
        price: '$2.90',
      },
      {
        name: 'Black Beans',
        description: 'Slow-cooked beans with garlic, onion, and spices.',
        price: '$3.90',
      },
      {
        name: 'Grilled Vegetables',
        description: 'Seasonal vegetables charred lightly with olive oil.',
        price: '$4.50',
      },
      {
        name: 'Caramel Flan',
        description: 'Silky Brazilian-style flan with caramel sauce.',
        price: '$4.90',
      },
    ],
  },
]

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-[#D4A373]/18 bg-[#120807] shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-2 hover:border-[#fd850b]/55">
      {item.image ? (
        <div className="relative h-56 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>
      ) : null}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-black leading-tight text-[#FFF7ED]">
            {item.name}
          </h3>
          <span className="shrink-0 text-xl font-black text-[#D4A373]">
            {item.price}
          </span>
        </div>
        <p className="mt-4 text-base leading-7 text-[#C7B8A8]">{item.description}</p>
      </div>
    </article>
  )
}

export default function MenuPage() {
  return (
    <>
      <Header />
      <main className="bg-[#120807] text-[#FFF7ED]">
        <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-8 lg:px-10">
          <Image
            src={heroImage}
            alt="Brazilian BBQ menu hero"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,7,0.92),rgba(18,8,7,0.5),rgba(18,8,7,0.92))]" />
          <div className="relative z-10 mx-auto max-w-4xl pt-16">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#fd850b]">
              Bravo Menu
            </p>
            <h1 className="font-serif text-5xl font-black leading-tight sm:text-6xl lg:text-8xl">
              Fire-grilled favourites
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-[#FCE7D3]">
              Premium Brazilian BBQ plates, buffet service, fresh sides, and
              drinks made for sharing.
            </p>
          </div>
        </section>

        {menuSections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`px-5 py-20 sm:px-8 lg:px-10 lg:py-28 ${
              index % 2 === 0 ? 'bg-[#1A0E0A]' : 'bg-[#120807]'
            }`}
          >
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#fd850b]">
                  {section.eyebrow}
                </p>
                <h2 className="font-serif text-4xl font-black leading-tight sm:text-5xl">
                  {section.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-[#C7B8A8]">
                  {section.description}
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map((item) => (
                  <MenuCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="relative overflow-hidden border-y border-[#D4A373]/18 px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <Image
            src={heroImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-24"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,7,0.98)_0%,rgba(18,8,7,0.86)_52%,rgba(18,8,7,0.7)_100%)]" />

          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#fd850b]">
                Book Bravo
              </p>
              <h2 className="font-serif text-4xl font-black uppercase leading-[0.92] sm:text-5xl lg:text-6xl">
                Ready to taste the fire?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#f4d8c5] sm:text-lg">
                Save your table for buffet service, flame-grilled cuts, and a
                full Brazilian steakhouse night in Phnom Penh.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Link
                href="/contact#reservation"
                className="inline-flex min-h-14 items-center justify-center gap-2 bg-[#fd850b] px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#120807] shadow-[0_18px_44px_rgba(253,133,11,0.32)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(253,133,11,0.5)]"
              >
                <i className="fa-solid fa-calendar-check" aria-hidden="true" />
                Book a Table
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-14 items-center justify-center gap-2 border border-[#FFF7ED]/42 bg-black/20 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#FFF7ED] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-[#120807]"
              >
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
                Visit Us
              </Link>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-9 grid max-w-6xl gap-3 sm:grid-cols-3">
            {menuCtaHighlights.map((item) => (
              <div
                key={item.label}
                className="border border-[#D4A373]/18 bg-[#FFF7ED]/7 px-5 py-4 backdrop-blur"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd850b]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-bold text-[#FFF7ED]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
