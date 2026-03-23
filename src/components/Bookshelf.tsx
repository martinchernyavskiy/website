import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Book {
  id: string; title: string; shortTitle: string; author: string; isbn: string;
  section: 'technical' | 'nontechnical'; status: 'read' | 'to-read';
  note: string; note2?: string; blurb: string; genres: string[]; spineW: number; spineAccent: string; buyUrl: string;
}

const BOOKS: Book[] = [
  { id: 'db-internals', genres: ['Storage Systems', 'Databases', 'Algorithms'], title: 'Database Internals', shortTitle: 'Database Internals',
    author: 'Alex Petrov', isbn: '9781492040347', section: 'technical', status: 'read',
    note: 'Petrov does something unusual here: he starts from the transistors-and-pointers level and works upward, which means by the time you reach distributed consensus you actually understand why the tradeoffs exist. The B-tree chapters are the best treatment of the subject I have found anywhere. He covers not just the structure but the write amplification math, the impact of page size on cache behavior, and why modern SSDs have changed the calculus compared to spinning disk. The LSM tree section is equally strong. He explains compaction strategies in a way that makes the differences between RocksDB and LevelDB feel intuitive rather than arbitrary.',
    note2: 'The second half on distributed systems is good but slightly less focused. The Paxos and Raft coverage is solid, and the failure detector taxonomy is genuinely useful for thinking about network partitions. If you already have a background in distributed systems the second half will feel like a well-organized review. If you do not, it is a fair introduction. The book rewards slow reading. Every chapter has at least one diagram worth staring at for five minutes.',
    blurb: 'A deep dive into how distributed data systems work — covering storage engines, B-trees, LSM trees, distributed algorithms, and replication protocols.',
    spineW: 29, spineAccent: '#1e293b', buyUrl: 'https://www.oreilly.com/library/view/database-internals/9781492040330/' },
  { id: 'ddia', genres: ['Distributed Systems', 'Databases', 'Software Engineering'], title: 'Designing Data-Intensive Applications', shortTitle: 'DDIA',
    author: 'Martin Kleppmann', isbn: '9781449373320', section: 'technical', status: 'read',
    note: 'This is the kind of book where you keep stopping to think rather than just reading. Kleppmann has a rare ability to explain why something is hard before explaining how people have tried to solve it, which makes the solutions feel earned rather than arbitrary. The chapter on data models made me reconsider how much accidental complexity lives in the relational model versus how much is genuinely necessary. The replication chapter is one of the clearest explanations of eventual consistency I have read. He does not pretend these problems have clean solutions.',
    note2: 'The batch and stream processing chapters at the end are worth reading twice. The framing of stream processing as a generalization of batch processing clicked something for me that years of reading about Kafka and Spark separately had not. My one complaint is that the book is better at identifying hard problems than at giving you practical tools to navigate them. That is probably the honest constraint of the subject matter, but it means you will finish the book with a sharper sense of what can go wrong and a slightly anxious feeling about everything running in production.',
    blurb: 'The big ideas behind reliable, scalable, and maintainable systems — covering data models, query languages, storage engines, and distributed systems fundamentals.',
    spineW: 38, spineAccent: '#b91c1c', buyUrl: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/' },
  { id: 'sdi-1', genres: ['System Design', 'Software Engineering'], title: 'System Design Interview', shortTitle: 'SDI Vol. 1',
    author: 'Alex Xu', isbn: '9798664653403', section: 'technical', status: 'to-read',
    note: "Haven't read yet. On the list for interview prep and architectural thinking.",
    blurb: "An insider's guide to system design interviews, covering URL shorteners, web crawlers, notification systems, news feeds, and more.",
    spineW: 26, spineAccent: '#1e40af', buyUrl: 'https://www.amazon.com/dp/B08CMF2CQF' },
  { id: 'sdi-2', genres: ['System Design', 'Software Engineering'], title: 'System Design Interview Vol. 2', shortTitle: 'SDI Vol. 2',
    author: 'Alex Xu & Sahn Lam', isbn: '9781736049112', section: 'technical', status: 'to-read',
    note: "Haven't read yet. Picks up where volume one left off with harder design problems.",
    blurb: 'Volume 2 covers proximity services, hotel reservation, ad click aggregation, and more advanced distributed system designs.',
    spineW: 32, spineAccent: '#0f766e', buyUrl: 'https://www.amazon.com/dp/1736049119' },
  { id: '1984', genres: ['Dystopian Fiction', 'Political Philosophy', 'Literary Fiction'], title: '1984', shortTitle: '1984', author: 'George Orwell', isbn: '9780451524935',
    section: 'nontechnical', status: 'read',
    note: 'What makes 1984 more unsettling each time I read it is not the surveillance or the violence but the language. Newspeak is the most frightening idea in the book because it is not science fiction. The systematic narrowing of vocabulary to make certain thoughts literally unthinkable is a thing that happens in increments in real institutions. Orwell understood that power does not just suppress dissent, it reshapes the conceptual territory so that dissent becomes harder to formulate in the first place. Winston is not tragic because he loses. He is tragic because by the end he genuinely loves Big Brother.',
    note2: 'The relationship between Winston and Julia is more interesting than it is usually given credit for. It is not a love story in any conventional sense. It is two people using each other as evidence that private feeling still exists. Orwell is also funnier than people remember. The bureaucratic texture of Oceania has a dry absurdity to it that makes the horror land harder. The Ministry of Plenty producing scarcity, the Ministry of Peace running wars. Reading it alongside anything about the Soviet bureaucracy makes the satire feel like documentary.',
    blurb: 'Winston Smith rewrites history for the totalitarian Party. When he seeks rebellion, he discovers the terrifying depths of the world he lives in.',
    spineW: 27, spineAccent: '#1e293b', buyUrl: 'https://www.amazon.com/dp/0451524934' },
  { id: 'brave-new-world', genres: ['Dystopian Fiction', 'Science Fiction', 'Satire'], title: 'Brave New World', shortTitle: 'Brave New World', author: 'Aldous Huxley', isbn: '9780060850524',
    section: 'nontechnical', status: 'read',
    note: "The comparison to 1984 is unavoidable but I think Huxley's vision is more psychologically sophisticated. Orwell imagined a boot on a face. Huxley imagined a population that had been conditioned to enjoy the boot. The Savage is the real protagonist but the most interesting character is Mustapha Mond, the World Controller who has read everything that is now forbidden and chose stability over truth anyway. He is not a villain in any simple sense. He makes a coherent argument for the world he administers, and the book never fully refutes it.",
    note2: "What ages oddly is how the novel imagines sex as the primary instrument of control. That part feels dated. What does not age is the insight that people can be made compliant not through fear but through the management of desire and attention. The soma scenes read differently now than they probably did in 1932. The chapters on Bokanovsky Groups and the conditioning nurseries are the most disturbing in the book, not because they are violent but because the children seem perfectly content.",
    blurb: 'A futuristic society built on pleasure, conditioning, and consumption — and the story of those who refuse to conform.',
    spineW: 26, spineAccent: '#ca8a04', buyUrl: 'https://www.amazon.com/dp/0060850523' },
  { id: 'crime-punishment', genres: ['Literary Fiction', 'Psychological Thriller', 'Philosophy'], title: 'Crime and Punishment', shortTitle: 'Crime & Punishment', author: 'Fyodor Dostoevsky', isbn: '9780140449136',
    section: 'nontechnical', status: 'read',
    note: 'Raskolnikov is not a sympathetic character and the novel does not ask you to find him one. He is brilliant, arrogant, and genuinely confused about whether his own intelligence entitles him to act outside ordinary moral constraints. That confusion is the engine of the book. The murder happens early. Everything after is the slow dissolution of the theory that justified it. Dostoevsky is not interested in the crime. He is interested in what it costs a person to maintain a false account of their own motives. The answer is everything.',
    note2: 'Sonya is a better character than most literary criticism suggests. She is not just a vehicle for Christian redemption. She is the only person in the novel who is fully honest about what she is and why, and that clarity is what Raskolnikov cannot tolerate and eventually cannot avoid. The pacing is slow by modern standards but the psychological granularity is worth it. Some of the interior monologue sequences are among the most accurate depictions of a mind arguing with itself that I have read anywhere.',
    blurb: 'A young student commits a murder and spends the rest of the novel wrestling with guilt, ideology, and the nature of justice.',
    spineW: 45, spineAccent: '#7f1d1d', buyUrl: 'https://www.amazon.com/dp/0140449132' },
  { id: 'dune', genres: ['Science Fiction', 'Political Philosophy', "Hero's Journey"], title: 'Dune', shortTitle: 'Dune', author: 'Frank Herbert', isbn: '9780441013593',
    section: 'nontechnical', status: 'read',
    note: 'Herbert built Arrakis from the ecology outward and it shows. The spice economy, the Fremen culture, the political structure of the Great Houses all feel like emergent consequences of one central fact: a desert planet with a single irreplaceable resource. That kind of rigorous world-building discipline is rare. Most fantasy and science fiction invents cultures and then figures out the economics later. Herbert did it the other way around. Paul is a good protagonist for the first book because he is still learning. The moment you realize the novel is partly a critique of the messianic hero you are following is when it gets interesting.',
    note2: "The Fremen are the most carefully imagined people in the book. Their language, their water discipline, their relationship to the worms, all of it coheres in a way that feels anthropologically honest rather than decorative. The sections told from Lady Jessica's point of view are underrated. She is navigating her own betrayals and loyalties with less certainty than she presents, and Herbert gives her enough interiority that you understand the bind she is in. The ending is triumphant on the surface and genuinely disturbing underneath. Paul knows exactly what he has started.",
    blurb: 'Paul Atreides arrives on the desert planet Arrakis, sole source of the most precious substance in the universe.',
    spineW: 54, spineAccent: '#92400e', buyUrl: 'https://www.amazon.com/dp/0441013597' },
  { id: 'alchemist', genres: ['Philosophical Fiction', 'Fable', "Hero's Journey"], title: 'The Alchemist', shortTitle: 'The Alchemist', author: 'Paulo Coelho', isbn: '9780062315007',
    section: 'nontechnical', status: 'read',
    note: 'Coelho writes in aphorisms and I usually find that irritating, but here it works because the novel is honest about being a fable. It is not trying to be realist fiction. The Soul of the World, the Personal Legend, the alchemical transformation all operate as symbols and the book does not apologize for that. What surprised me on a second reading was how much Santiago actually fails before he succeeds, and how much of his journey involves learning to read omens rather than control outcomes. That is a subtler point than the usual inspirational gloss on this book suggests.',
    note2: 'The Alchemist himself appears late and briefly, which is a good choice. He is more useful as a catalyst than a teacher. The scene in the desert where Santiago must become the wind is the best in the book and probably the hardest to explain to someone who has not read it. Either it works for you or it does not. The ending is quiet and right. The treasure was always back at home but Santiago needed to make the journey to understand what home meant. That is not a twist, it is the point.',
    blurb: "A young shepherd follows his dream across the Egyptian desert. A fable about listening to your heart and the soul of the world.",
    spineW: 21, spineAccent: '#d97706', buyUrl: 'https://www.amazon.com/dp/0062315005' },
  { id: 'fellowship', genres: ['Fantasy', 'Epic', "Hero's Journey"], title: 'The Fellowship of the Ring', shortTitle: 'Fellowship', author: 'J.R.R. Tolkien', isbn: '9780618346257',
    section: 'nontechnical', status: 'read',
    note: "The Shire chapters are slow and some people never forgive them. I think they are essential. Tolkien is establishing a baseline of comfort and smallness so that when the scale of the quest becomes clear the contrast registers properly. By the time you reach Rivendell you have spent enough time in the Shire that leaving it feels like an actual loss. The Fellowship itself is a remarkable construction: nine people with entirely different relationships to the Ring, to each other, and to what is being asked of them. The tension is baked in before they take a single step.",
    note2: 'The Council of Elrond chapter is one of my favorite things in the trilogy. It is a long meeting where very little happens except talking, and it is completely riveting because everyone in the room has a different piece of the history and a different stake in the decision. The decision to destroy the Ring rather than use it is not obvious and Tolkien earns it rather than asserting it. The Mines of Moria section builds genuine dread. The bridge scene lands because Tolkien has made you believe in Gandalf as a person first and a wizard second.',
    blurb: 'Frodo Baggins inherits a ring of immense power and sets out across Middle-earth to destroy it before darkness claims it.',
    spineW: 32, spineAccent: '#166534', buyUrl: 'https://www.amazon.com/dp/0618346252' },
  { id: 'hp1', genres: ['Fantasy', 'Young Adult', 'Mystery'], title: "Harry Potter and the Sorcerer's Stone", shortTitle: "HP: Stone", author: 'J.K. Rowling', isbn: '9780590353427',
    section: 'nontechnical', status: 'read',
    note: "Reading this as an adult is a different experience than reading it as a child. As a child you notice the magic. As an adult you notice how carefully Rowling plants every clue. The Sorcerer's Stone is structured like a mystery novel: the information that solves the plot is available from early chapters if you are paying attention. Quirrell is in the book from the first chapter and the clues pointing to him are fair. Rowling trusts young readers to handle real stakes, which is part of why the series works. Nobody is protected by being a child.",
    blurb: 'Harry Potter discovers he is a wizard on his eleventh birthday and enters a magical world of wonder, friendship, and danger.',
    spineW: 22, spineAccent: '#b91c1c', buyUrl: 'https://www.amazon.com/dp/0590353403' },
  { id: 'hp2', genres: ['Fantasy', 'Young Adult', 'Mystery'], title: 'Harry Potter and the Chamber of Secrets', shortTitle: "HP: Chamber", author: 'J.K. Rowling', isbn: '9780439064873',
    section: 'nontechnical', status: 'read',
    note: "Chamber of Secrets is the book where the series starts showing its architecture. Nearly Headless Nick's death day party, the history of Salazar Slytherin, the Chamber itself, all of it gets picked up and used again in later books. Ginny is a more interesting character here than she later becomes, precisely because she is frightened and compromised and does not have the confidence she develops later. The diary as a Horcrux is a quietly brilliant piece of plotting that you only fully appreciate on re-reads.",
    blurb: 'Harry returns to Hogwarts to find students being petrified and a mysterious voice only he can hear.',
    spineW: 23, spineAccent: '#0f766e', buyUrl: 'https://www.amazon.com/dp/0439064872' },
  { id: 'hp3', genres: ['Fantasy', 'Young Adult', 'Mystery'], title: 'Harry Potter and the Prisoner of Azkaban', shortTitle: "HP: Azkaban", author: 'J.K. Rowling', isbn: '9780439136358',
    section: 'nontechnical', status: 'read',
    note: 'The time travel in this book is the cleanest piece of plot mechanics in the series. Every loop closes. The Hermione-who-has-been-there-all-along is in the text the first time through if you look for her. Rowling understood that time travel only works in fiction if the rules are consistent and she was disciplined enough to follow them. Lupin is also the character who most clearly demonstrates what good teaching looks like: he pays attention to what each student needs and adjusts accordingly. The boggart chapter works because of that.',
    note2: "Sirius Black is the most interesting character introduction in the series. The reveal works because Rowling has done two things simultaneously: she has made you believe the false version of him and she has made you feel, when the truth comes out, that you should have known. The Marauder backstory opens up a version of the wizarding world that exists before Harry was born and makes it feel larger. The dementors remain the most effective monsters in the series. They are not violent. They just take away everything that makes life worth living.",
    blurb: "A dangerous prisoner has escaped Azkaban and seems intent on finding Harry. The series' best plotting begins here.",
    spineW: 26, spineAccent: '#1d4ed8', buyUrl: 'https://www.amazon.com/dp/0439136350' },
  { id: 'hp4', genres: ['Fantasy', 'Young Adult', 'Mystery'], title: 'Harry Potter and the Goblet of Fire', shortTitle: "HP: Goblet", author: 'J.K. Rowling', isbn: '9780439139595',
    section: 'nontechnical', status: 'read',
    note: "The first three books were a boarding school story with magic. Goblet of Fire is where the story becomes something larger and more serious. Rowling earns the tonal shift by making the tournament genuinely fun for most of the book before pulling the floor out. The maze at the end is the best sequence in the tournament arc: no monsters, just disorientation and dread and the creeping sense that something is wrong. The graveyard scene is the best single chapter in the series. Cedric's death hits hard because Rowling has taken the trouble to make him a real person.",
    blurb: 'Harry is mysteriously entered into a dangerous tournament while Voldemort moves closer to full resurrection.',
    spineW: 43, spineAccent: '#0369a1', buyUrl: 'https://www.amazon.com/dp/0439139597' },
  { id: 'hp5', genres: ['Fantasy', 'Young Adult', 'Political Philosophy'], title: 'Harry Potter and the Order of the Phoenix', shortTitle: "HP: Phoenix", author: 'J.K. Rowling', isbn: '9780439358071',
    section: 'nontechnical', status: 'read',
    note: 'Umbridge works as a villain because she is not a dark lord. She is a bureaucrat who has discovered that rules, applied selectively and with smiling persistence, can cause as much damage as any spell. Her cruelty is entirely deniable because it is always officially sanctioned. Rowling understood that this kind of institutional malice is harder to fight than open violence because it inverts the social contract rather than breaking it. The scene where Harry writes lines with her quill is the most upsetting thing in the series and there is no magic involved.',
    note2: "The Order of the Phoenix as an organization is interesting precisely because it is ineffective. A group of competent adults trying to fight a secret war and mostly failing to protect the people they care about. Sirius dies in a way that feels pointless and that is intentional. Not every sacrifice is meaningful or heroic. Dumbledore's explanation to Harry at the end of the book is one of the best pieces of dialogue in the series: he admits he was wrong to protect Harry from information Harry needed.",
    blurb: 'Harry struggles to be believed as Voldemort returns while a new Ministry-installed teacher terrorizes Hogwarts.',
    spineW: 55, spineAccent: '#4338ca', buyUrl: 'https://www.amazon.com/dp/043935806X' },
  { id: 'hp6', genres: ['Fantasy', 'Young Adult', 'Mystery'], title: 'Harry Potter and the Half-Blood Prince', shortTitle: "HP: Prince", author: 'J.K. Rowling', isbn: '9780439784542',
    section: 'nontechnical', status: 'read',
    note: 'The pensieve chapters are where Half-Blood Prince earns its place in the series. Rowling takes the risk of making Voldemort comprehensible, not sympathetic, but understandable as a person shaped by specific circumstances. The orphanage scenes, the encounter with Hepzibah Smith, the early meeting with Dumbledore, they all show a person who could have been different and chose not to be. That choice is what makes him frightening rather than just a force of evil. Dumbledore narrating these memories knows he is also preparing Harry for something specific.',
    note2: "The romance subplot is handled better than people give it credit for. Rowling is honest about teenage infatuation being ridiculous and distracting and occasionally consuming even when the world is ending. Harry's obsession with the Half-Blood Prince's annotated potions book is a nice piece of characterization: he is good at something for the first time without being told why, and he likes it more than he should. The ending is brutal and deliberately unresolved. Snape's identity as the Half-Blood Prince lands correctly because it recontextualizes everything from the first book.",
    blurb: "Dumbledore prepares Harry for the final confrontation by exploring Voldemort's past through magical memories.",
    spineW: 41, spineAccent: '#374151', buyUrl: 'https://www.amazon.com/dp/0439784549' },
  { id: 'hp7', genres: ['Fantasy', 'Young Adult', 'Adventure'], title: 'Harry Potter and the Deathly Hallows', shortTitle: "HP: Hallows", author: 'J.K. Rowling', isbn: '9780545010221',
    section: 'nontechnical', status: 'read',
    note: 'The camping sections are too long and Rowling knows it. She has said so. But they serve a function: they establish that the quest has a cost that no amount of talent or luck can avoid. Harry, Ron, and Hermione are genuinely miserable and frightened for an extended period, and that misery is what makes the reunion at Shell Cottage feel earned rather than just convenient. The Deathly Hallows as a concept integrates cleanly with the Horcrux plot. The story of the three brothers is one of the best things Rowling ever wrote.',
    note2: "The King's Cross chapter, where Harry speaks with Dumbledore between life and death, is the best scene in the series. Rowling answers almost every remaining question about the mythology in a conversation that feels quiet and gentle and final. Snape's memories in the pensieve restructure everything that came before them. The epilogue is fine. It does exactly one thing: it tells you the world continued and the people in it built ordinary lives. That is the right note to end on after seven books about a war.",
    blurb: "Harry, Ron, and Hermione set out to hunt and destroy Voldemort's Horcruxes in a race to end the war.",
    spineW: 41, spineAccent: '#581c87', buyUrl: 'https://www.amazon.com/dp/0545010225' },
  { id: 'hobbit', genres: ['Fantasy', 'Epic', "Hero's Journey"], title: 'The Hobbit', shortTitle: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227',
    section: 'nontechnical', status: 'read',
    note: 'The Hobbit has a narrative voice that does not exist anywhere else in Tolkien. It is warm and slightly ironic and directly addresses the reader, which LOTR never does. That voice is what makes it feel like a different kind of book even though it is set in the same world. Bilbo is a better protagonist than Frodo in some ways because his reluctance is genuinely comic. He keeps making tea and worrying about pocket handkerchiefs while dwarves are making plans to reclaim a mountain full of dragon. The way his courage gradually assembles itself without him noticing is quietly done.',
    note2: 'Riddles in the Dark is the chapter that justifies everything else. It works as a riddle competition, as a character study, and as a piece of pure atmosphere. Gollum before he became LOTR Gollum is more interesting than people remember: dangerous and pitiable in equal measure without the later mythology weighing on him. Smaug is also genuinely frightening. The chapter where Bilbo talks to him under the mountain is tense in a way the rest of the book is not. The dragon is smart and the conversation could go wrong in multiple directions simultaneously.',
    blurb: 'Bilbo Baggins is swept into an epic quest to reclaim a lost dwarf kingdom from the dragon Smaug.',
    spineW: 26, spineAccent: '#15803d', buyUrl: 'https://www.amazon.com/dp/054792822X' },
  { id: 'return-king', genres: ['Fantasy', 'Epic', "Hero's Journey"], title: 'The Return of the King', shortTitle: 'Return of the King', author: 'J.R.R. Tolkien', isbn: '9780618346271',
    section: 'nontechnical', status: 'read',
    note: 'The Pelennor Fields sequence is the best sustained action writing in the trilogy. The Rohirrim charge has been described and imitated hundreds of times since and nothing has quite matched it. What makes it work is the buildup: the long night ride, the muster of Rohan, the arrival in the dark. By the time the horns sound you have been waiting for it long enough that it hits like a physical thing. The chapter does not trade on spectacle alone. Eowyn and Theoden both get their moments and both feel necessary rather than decorative.',
    note2: 'The Scouring of the Shire is a chapter that readers often skip or find anticlimactic. I think it is important. The hobbits come home to find their home occupied and diminished, and they have to fight for it using everything they learned on the road. It is Tolkien saying that the large heroic struggle does not sanitize the small immediate one. The ending is genuinely sad. Frodo is wounded in ways that cannot be healed in Middle-earth and he knows it. Sam gets the last line and it is the right choice.',
    blurb: 'The war of the Ring reaches its climax as the forces of good make their last stand against Sauron.',
    spineW: 31, spineAccent: '#991b1b', buyUrl: 'https://www.amazon.com/dp/0618346279' },
  { id: 'two-towers', genres: ['Fantasy', 'Epic', "Hero's Journey"], title: 'The Two Towers', shortTitle: 'The Two Towers', author: 'J.R.R. Tolkien', isbn: '9780618346264',
    section: 'nontechnical', status: 'read',
    note: "Tolkien makes a structural decision here that could have failed badly: he splits the Fellowship into two separate storylines and tells them in sequence rather than interleaving. It works because each storyline has its own internal momentum. The Rohan chapters build to Helm's Deep with genuine urgency and the Frodo chapters have a completely different rhythm, slow and increasingly claustrophobic as Mordor gets closer. The tonal contrast is itself an argument about the nature of the quest: heroic war on one side, lonely endurance on the other.",
    note2: "Gollum in this book is the most complex character in the trilogy. He is simultaneously guide, threat, and foreshadowing. His conversations with himself are written in a way that makes the split feel real rather than theatrical. Faramir is better here than he is in the films: his decision not to take the Ring is made quickly and without agonizing, which makes it more impressive, not less. The end of the book cuts off at the worst possible moment on purpose. Tolkien knew exactly what he was doing.",
    blurb: "The Fellowship is broken. Frodo continues toward Mordor while Aragorn pursues the Uruk-hai across Rohan.",
    spineW: 28, spineAccent: '#6d28d9', buyUrl: 'https://www.amazon.com/dp/0618346260' },
];

const BOOKS_PER_ROW = 8;
const SHELF_H = 150;

function sortedSection(section: 'technical' | 'nontechnical') {
  return BOOKS.filter(b => b.section === section).sort((a, b) => a.title.localeCompare(b.title));
}
function chunkRows(books: Book[], perRow = BOOKS_PER_ROW): Book[][] {
  const rows: Book[][] = [];
  for (let i = 0; i < books.length; i += perRow) rows.push(books.slice(i, i + perRow));
  return rows;
}
function rangeLabel(row: Book[]) {
  if (!row.length) return '';
  const f = row[0].title[0].toUpperCase(), l = row[row.length-1].title[0].toUpperCase();
  return f === l ? f : `${f} – ${l}`;
}

function paginateText(text: string, charsPerPage = 340): string[] {
  if (!text) return [];
  const pages: string[] = [];
  let remaining = text.trim();
  while (remaining.length > 0) {
    if (remaining.length <= charsPerPage) {
      pages.push(remaining);
      break;
    }

    const chunk = remaining.slice(0, charsPerPage);
    const lastSentence = Math.max(
      chunk.lastIndexOf('. '),
      chunk.lastIndexOf('! '),
      chunk.lastIndexOf('? ')
    );
    const cut = lastSentence > charsPerPage * 0.5
      ? lastSentence + 1
      : chunk.lastIndexOf(' ');
    if (cut <= 0) {
      pages.push(remaining.slice(0, charsPerPage));
      remaining = remaining.slice(charsPerPage).trimStart();
    } else {
      pages.push(remaining.slice(0, cut).trimEnd());
      remaining = remaining.slice(cut).trimStart();
    }
  }
  return pages;
}


const PAGE_STRIPES = Array.from({ length: 20 }, (_, i) => i);

function Book3DModal({ book, onClose }: { book: Book; onClose: () => void }) {
  const noteChunks  = paginateText(book.note);
  const note2Chunks = paginateText(book.note2 || '');
  const allNoteChunks = [...noteChunks, ...note2Chunks];

  const PAGES: Array<{ frontLabel: string; front: string; backLabel: string; back: string }> = [];

  PAGES.push({ frontLabel: 'About', front: book.blurb, backLabel: 'My Note', back: allNoteChunks[0] || '' });

  const detailsText = `Author: ${book.author}\n\nGenre: ${book.genres.join(', ')}\n\nISBN:\n${book.isbn}`;

  for (let i = 1; i < allNoteChunks.length; i += 2) {
    PAGES.push({
      frontLabel: 'My Note cont.',
      front: allNoteChunks[i],
      backLabel: allNoteChunks[i + 1] ? 'My Note cont.' : '',
      back: allNoteChunks[i + 1] || '',
    });
  }

  const lastPage = PAGES[PAGES.length - 1];
  if (!lastPage.back) {
    lastPage.backLabel = 'Details';
    lastPage.back = detailsText;
  } else {
    PAGES.push({ frontLabel: 'Details', front: detailsText, backLabel: '', back: '' });
  }
  const N = PAGES.length;

  const [rotX, setRotX]           = useState(-8);
  const [rotY, setRotY]           = useState(-22);
  const [coverOpen, setCoverOpen] = useState(false);
  const [turned, setTurned]       = useState(0);
  const [imgErr, setImgErr]       = useState(false);
  const [floating, setFloating]   = useState(true);
  const [closing, setClosing]     = useState(false);
  const [endHold, setEndHold]     = useState(false);
  const [expanded,   setExpanded]   = useState(false);
  const [winH,       setWinH]       = useState(typeof window!=='undefined' ? window.innerHeight : 800);
  const [winW,       setWinW]       = useState(typeof window!=='undefined' ? window.innerWidth  : 1200);
  const W = Math.min(190, Math.floor((winW - 32) / 2));
  const H = Math.round(W * 260 / 190);
  const D = Math.round(W * 38 / 190);
  const modalRef = useRef<HTMLDivElement>(null);

  const dragRef      = useRef<{ sx: number; sy: number; rx: number; ry: number } | null>(null);
  const isDragging   = useRef(false);
  const coverPressed = useRef(false);
  const tapSideRef   = useRef<'left' | 'right' | null>(null);
  const sceneRef     = useRef<HTMLDivElement>(null);
  const idleTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const coverUrl = `/api/cover/${book.isbn}`;

  const toggleExpanded = useCallback(() => setExpanded(e => !e), []);

  const doClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    if (endTimer.current) clearTimeout(endTimer.current);
    closeTimer.current = setTimeout(() => {
      setTurned(0); setCoverOpen(false); setRotX(-8); setRotY(-22);
      setTimeout(() => { setFloating(true); setClosing(false); setEndHold(false); }, 850);
    }, 500);
  }, [closing]);

  const resetIdle = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setFloating(true), 4000);
  }, []);

  useEffect(() => { resetIdle(); return () => { if (idleTimer.current) clearTimeout(idleTimer.current); if (closeTimer.current) clearTimeout(closeTimer.current); }; }, [resetIdle]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onResize = () => { setWinH(window.innerHeight); setWinW(window.innerWidth); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (turned === N && coverOpen && !closing && !endHold) {
      setEndHold(true);

      endTimer.current = setTimeout(() => doClose(), 4000);
    }
    return () => { if (endTimer.current) clearTimeout(endTimer.current); };
  }, [turned, N, coverOpen, closing, endHold, doClose]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!coverOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (endHold) { doClose(); return; }
        setTurned(p => { if (p < N) { resetIdle(); return p + 1; } return p; });
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (endHold) {
          if (endTimer.current) clearTimeout(endTimer.current);
          setEndHold(false);
          setTurned(N - 1); resetIdle(); return;
        }
        setTurned(p => { if (p > 0) { resetIdle(); return p - 1; } return p; });
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose, coverOpen, N, endHold, doClose, resetIdle]);

  const onPD = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setFloating(false); isDragging.current = false;
    dragRef.current = { sx: e.clientX, sy: e.clientY, rx: rotX, ry: rotY };
    if (sceneRef.current) {
      const rect = sceneRef.current.getBoundingClientRect();

      const threshold = coverOpen ? rect.width * 0.20 : rect.width * 0.50;
      tapSideRef.current = (e.clientX - rect.left) < threshold ? 'left' : 'right';
    }
    resetIdle();
  };
  const onPM = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.sx, dy = e.clientY - dragRef.current.sy;
    if (Math.abs(dx) + Math.abs(dy) > 5) isDragging.current = true;
    setRotY(dragRef.current.ry + dx * 0.42);
    setRotX(Math.max(-42, Math.min(42, dragRef.current.rx - dy * 0.32)));
  };
  const onPU = () => {
    const wasDrag = isDragging.current;
    const side    = tapSideRef.current;
    dragRef.current = null; isDragging.current = false; tapSideRef.current = null;
    if (!wasDrag) {
      if (coverPressed.current) {
        coverPressed.current = false;
        if (!closing) setCoverOpen(o => { if (o) { setTurned(0); setEndHold(false); } return !o; });
      } else if (coverOpen && !closing) {

        if (side === 'left')  goPrev();
        else if (side === 'right') goNext();
      }
    } else { coverPressed.current = false; }
    resetIdle();
  };

  const goNext = () => {
    if (endHold) { doClose(); return; }
    if (turned < N) { setTurned(p => p + 1); resetIdle(); }
  };
  const goPrev = () => {
    if (endHold) {
      if (endTimer.current) clearTimeout(endTimer.current);
      setEndHold(false); setTurned(N - 1); resetIdle(); return;
    }
    if (turned > 0) { setTurned(p => p - 1); resetIdle(); }
  };

  const frontFace = (accent: string): React.CSSProperties => ({
    position: 'absolute', width: W, height: H, left: 0, top: 0,
    backfaceVisibility: 'hidden', background: '#fdf9f2',
    padding: '16px 14px', boxSizing: 'border-box',
    borderLeft: `2px solid ${accent}55`,
    boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.07)',
    display: 'flex', flexDirection: 'column', gap: 7, userSelect: 'none',
    overflow: 'hidden',
  });
  const backFace = (accent: string): React.CSSProperties => ({
    position: 'absolute', width: W, height: H, left: 0, top: 0,
    backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
    background: '#fdf9f2', padding: '16px 14px', boxSizing: 'border-box',
    borderRight: `2px solid ${accent}55`,
    boxShadow: 'inset 3px 0 8px rgba(0,0,0,0.07)',
    display: 'flex', flexDirection: 'column', gap: 7, userSelect: 'none',
    overflow: 'hidden',
  });

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      onContextMenu={e => e.preventDefault()}
      style={{ background: 'rgba(1,12,28,0.9)', backdropFilter: 'blur(12px)', userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <div
        className="flex flex-col items-center gap-4"
        onClick={e => e.stopPropagation()}
        style={{ userSelect: 'none', width: '100%', maxWidth: W * 2 }}
      >
        {}
        <div style={(() => {
          if (!expanded) return { flexShrink: 0, marginLeft: coverOpen ? `${W}px` : '0px', transition: 'margin-left 0.5s cubic-bezier(0.25,0.46,0.45,0.94)' };

          const effectiveW = coverOpen ? W * 2.0 : W;
          const s = Math.max(1.0, Math.min(
            (winH - 140) / H,
            (winW - 60) / effectiveW,
            1.75
          ));
          const bookCenterY = (winH - 80) / 2 + 40;
          const bookTop     = bookCenterY - (H * s) / 2;

          const leftPx = coverOpen ? winW / 2 : winW / 2 - (W * s) / 2;
          return {
            position: 'fixed',
            top: `${bookTop}px`,
            left: `${leftPx}px`,
            zIndex: 9997,
            transform: `scale(${s.toFixed(2)})`,
            transformOrigin: 'top left',
            transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), top 0.5s, left 0.5s',
          };
        })()}>
        <div ref={sceneRef} style={{
          position: 'relative', width: W, height: H, perspective: 1100,
          cursor: 'grab',
          animation: floating ? 'book-float 3.5s ease-in-out infinite' : 'none',
          filter: 'drop-shadow(0 28px 24px rgba(0,0,0,0.55))',
          touchAction: 'none',
        }}
          onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU} onPointerCancel={onPU}
        >
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            width: 0, height: 0,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transition: dragRef.current ? 'none' : 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}>

            {}
            <div style={{
              position: 'absolute', width: W, height: H, left: -W/2, top: -H/2,
              transform: `rotateY(180deg) translateZ(${D/2}px)`,
              backfaceVisibility: 'hidden',
              background: book.spineAccent,
              borderRadius: '0 2px 2px 0',
            }} />

            {}
            <div style={{
              position: 'absolute', width: D, height: H, left: -D/2, top: -H/2,
              transform: `rotateY(-90deg) translateZ(${W/2}px)`,
              backfaceVisibility: 'hidden',
              background: book.spineAccent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', color: 'rgba(255,255,255,0.95)', fontSize: 10, fontWeight: 700, userSelect: 'none', letterSpacing: '0.06em' }}>{book.shortTitle}</span>
            </div>

            {}
            <div style={{
              position: 'absolute', width: D, height: H, left: -D/2, top: -H/2,
              transform: `rotateY(90deg) translateZ(${W/2}px)`,
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(to right, #f5f0e8, #ede8df)',
              overflow: 'hidden',
            }}>
              {PAGE_STRIPES.map(i => (
                <div key={i} style={{
                  position: 'absolute', left: 0, right: 0,
                  top: `${(i / 20) * 100}%`, height: '5%',
                  background: i % 3 === 0 ? 'rgba(180,160,130,0.18)' : 'rgba(200,185,160,0.08)',
                  borderBottom: i % 3 === 0 ? '0.5px solid rgba(160,140,110,0.25)' : 'none',
                }} />
              ))}
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 2, background: 'rgba(160,140,110,0.35)' }} />
            </div>

            {}
            <div style={{
              position: 'absolute', width: W, height: D, left: -W/2, top: -D/2,
              transform: `rotateX(-90deg) translateZ(${H/2}px)`,
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(to bottom, #faf6ee, #ede8df)',
            }} />

            {}
            <div style={{
              position: 'absolute', width: W, height: D, left: -W/2, top: -D/2,
              transform: `rotateX(90deg) translateZ(${H/2}px)`,
              backfaceVisibility: 'hidden', background: '#ede8df',
            }} />

            {}
            <div style={{
              position: 'absolute', left: -W/2, top: -H/2,
              width: 0, height: H, transformStyle: 'preserve-3d',
              transform: `translateZ(${D/2}px)`,
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, width: W, height: H,
                transformStyle: 'preserve-3d', transformOrigin: '0 50%',
                transform: `rotateY(${coverOpen ? -178 : 0}deg)`,
                transition: 'transform 0.85s cubic-bezier(0.23,1,0.32,1)',
                cursor: closing ? 'default' : 'pointer',
              }}>
                {}
                <div
                  onPointerDown={() => { if (!closing) coverPressed.current = true; }}
                  style={{
                    position: 'absolute', width: W, height: H, left: 0, top: 0,
                    backfaceVisibility: 'hidden', overflow: 'hidden',
                    borderRadius: '0 3px 3px 0',
                    boxShadow: '3px 0 12px rgba(0,0,0,0.45)',
                  }}>
                  {}
                  <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                    background: 'linear-gradient(120deg, rgba(255,255,255,0.12) 0%, transparent 50%)',
                  }} />
                  {!imgErr ? (
                    <img src={coverUrl} alt={book.title} draggable={false} loading="eager" decoding="async"
                      onDragStart={e => e.preventDefault()}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', userSelect: 'none', pointerEvents: 'none', background: '#0a0a0a' }}
                      onError={() => setImgErr(true)} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${book.spineAccent}77, ${book.spineAccent}33)`, borderLeft: `4px solid ${book.spineAccent}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 20, boxSizing: 'border-box' }}>
                      <p style={{ color: book.spineAccent, fontWeight: 700, fontSize: 13, textAlign: 'center', margin: 0, lineHeight: 1.4, userSelect: 'none' }}>{book.title}</p>
                      <p style={{ color: book.spineAccent, fontSize: 10, opacity: 0.7, margin: 0, userSelect: 'none' }}>{book.author}</p>
                    </div>
                  )}
                </div>

                <div style={{
                  position: 'absolute', width: W, height: H, left: 0, top: 0,
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(to left, #eaecf0, #eef0f4)',
                  borderRight: `2px solid ${book.spineAccent}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: 'rgba(148,163,184,0.4)', fontSize: 8, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.18em', userSelect: 'none' }}>
                    {book.shortTitle}
                  </span>
                </div>

              </div>
            </div>

            {}
            {[...PAGES].reverse().map((pg, ri) => {
              const i = N - 1 - ri;
              const isTurned = turned > i;

              const zOff = isTurned ? D/2 + 4 + i * 4 : D/2 - 4 - i * 4;
              return (
                <div key={i} style={{
                  position: 'absolute', left: -W/2, top: -H/2,
                  width: 0, height: H, transformStyle: 'preserve-3d',
                  transform: `translateZ(${zOff}px)`,
                }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0, width: W, height: H,
                    transformStyle: 'preserve-3d', transformOrigin: '0 50%',
                    transform: `rotateY(${isTurned ? -178 : 0}deg)`,
                    transition: 'transform 0.75s cubic-bezier(0.23,1,0.32,1)',
                  }}>
                    <div style={frontFace(book.spineAccent)}>
                      <span style={{ fontSize: 7, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.18em', color: book.spineAccent, opacity: 0.85 }}>
                        {pg.frontLabel}
                      </span>
                      <p style={{ fontSize: 9.5, lineHeight: 1.7, color: '#1e293b', margin: 0, whiteSpace: 'pre-line', userSelect: 'none' }}>
                        {pg.front}
                      </p>
                    </div>
                    <div style={backFace(book.spineAccent)}>
                      {pg.backLabel && (
                        <span style={{ fontSize: 7, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.18em', color: book.spineAccent, opacity: 0.85 }}>
                          {pg.backLabel}
                        </span>
                      )}
                      <p style={{ fontSize: 9.5, lineHeight: 1.7, color: '#1e293b', fontStyle: 'italic', margin: 0, userSelect: 'none' }}>
                        {pg.back || ''}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {}
            <div style={{
              position: 'absolute', left: -W/2, top: -H/2,
              width: 0, height: H, transformStyle: 'preserve-3d',
              transform: `translateZ(${D/2 - 4 - N * 4}px)`,
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, width: W, height: H,
                backfaceVisibility: 'hidden', background: '#fdf9f2',
                borderLeft: `2px solid ${book.spineAccent}33`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 8, userSelect: 'none',
              }}>
                {endHold && !closing ? (
                  <>
                    <span style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.3em', color: book.spineAccent, opacity: 0.5 }}>The End</span>
                    <div style={{ width: 32, height: 1, background: book.spineAccent, opacity: 0.2 }} />
                    <span style={{ fontSize: 7, fontFamily: 'monospace', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 4 }}>closing soon…</span>
                  </>
                ) : null}
              </div>
            </div>

            <div style={{
              position: 'absolute', width: W, height: H, left: -W/2, top: -H/2,
              transform: `translateZ(${-(D/2 + 2)}px)`,
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(to right, #eaecf0, #eef0f4)',
              borderRight: '1px solid rgba(148,163,184,0.15)',
            }} />

          </div>
        </div>
        </div>

        {}
        {!expanded && (
          <>
            <div className="flex flex-col items-center gap-1 text-center" style={{ userSelect: 'none' }}>
              <p className="text-sm font-bold text-white">{book.title}</p>
              <p className="text-xs text-sky-400">{book.author}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap justify-center">
                <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                  book.status === 'read'
                    ? 'text-emerald-400 border-emerald-600 bg-emerald-900/30'
                    : 'text-amber-400 border-amber-600 bg-amber-900/30'
                }`}>{book.status === 'read' ? '✓ Read' : 'To read'}</span>
                {book.genres.map(g => (
                  <span key={g} className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border text-sky-400/70 border-sky-700/40 bg-sky-900/20">
                    {g}
                  </span>
                ))}
                <a href={book.buyUrl} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-[9px] font-mono font-bold uppercase tracking-widest text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-2">
                  View book ↗
                </a>
              </div>
            </div>
            {coverOpen && !closing && (
              <div style={{ display:"flex", alignItems:"center", gap:8, userSelect:"none", flexShrink:0, whiteSpace:"nowrap" }}>
                <button onClick={e => { e.stopPropagation(); goPrev(); }} onPointerDown={e => e.stopPropagation()}
                  disabled={turned === 0 && !endHold}
                  style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", padding:"4px 10px", borderRadius:5, border:"1px solid rgba(56,189,248,0.4)", color:"#38bdf8", background:"transparent", cursor:"pointer", flexShrink:0, opacity:(turned===0&&!endHold)?0.3:1 }}>
                  ← prev
                </button>
                <span style={{ fontSize:9, fontFamily:"monospace", color:"rgba(56,189,248,0.5)", flexShrink:0 }}>{endHold ? "end" : `${turned} / ${N}`}</span>
                <button onClick={e => { e.stopPropagation(); goNext(); }} onPointerDown={e => e.stopPropagation()}
                  disabled={turned === N && !endHold}
                  style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", padding:"4px 10px", borderRadius:5, border:"1px solid rgba(56,189,248,0.4)", color:"#38bdf8", background:"transparent", cursor:"pointer", flexShrink:0, opacity:(turned===N&&!endHold)?0.3:1 }}>
                  {endHold ? "close ✕" : "next →"}
                </button>
              </div>
            )}
            <button onClick={e => { e.stopPropagation(); toggleExpanded(); resetIdle(); }} onPointerDown={e => e.stopPropagation()}
              style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em",
                padding:"5px 14px", borderRadius:6, border:"1px solid rgba(56,189,248,0.3)",
                color:"#38bdf8", background:"transparent", cursor:"pointer", userSelect:"none",
                display:"flex", alignItems:"center", gap:6 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 4V1H4M6 1H9V4M9 6V9H6M4 9H1V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Expand
            </button>
            <p className="text-[9px] font-mono text-sky-800 uppercase tracking-widest" style={{ userSelect: 'none' }}>
              drag · click cover to {coverOpen ? 'close' : 'open'} · ← → to turn · esc to close
            </p>
          </>
        )}
      </div>

      {}
      {expanded && (
        <div onClick={e => e.stopPropagation()} onPointerDown={e => e.stopPropagation()}
          style={(() => {
            const effectiveW = coverOpen ? W * 2.0 : W;
            const s = Math.max(1.0, Math.min((winH - 140) / H, (winW - 60) / effectiveW, 1.75));
            const scaledH = H * s;
            const bookCenterY = (winH - 80) / 2 + 40;
            const bookTop   = bookCenterY - scaledH / 2;
            const bookBottom = bookTop + scaledH + 16;
            return {
              position: 'fixed',
              top: Math.min(bookBottom, winH - 80),
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 99999,
              background: 'rgba(1,12,28,0.92)', backdropFilter: 'blur(14px)',
              border: '1px solid rgba(56,189,248,0.14)', borderRadius: 10,
              padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexWrap: 'wrap', gap: 10, userSelect: 'none', whiteSpace: 'nowrap',
            };
          })()}>
          <span style={{ fontSize:10, fontWeight:700, color:'#fff' }}>{book.title}</span>
          <span style={{ fontSize:9, color:'#38bdf8' }}>{book.author}</span>
          {coverOpen && !closing && (
            <>
              <button onClick={e => { e.stopPropagation(); goPrev(); }} onPointerDown={e => e.stopPropagation()}
                disabled={turned === 0 && !endHold}
                style={{ fontSize:9, fontFamily:'monospace', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                  padding:'4px 10px', borderRadius:5, border:'1px solid rgba(56,189,248,0.4)',
                  color:'#38bdf8', background:'transparent', cursor:'pointer', opacity: (turned === 0 && !endHold) ? 0.3 : 1 }}>
                ← prev
              </button>
              <span style={{ fontSize:9, fontFamily:'monospace', color:'rgba(56,189,248,0.5)' }}>{endHold ? 'end' : `${turned} / ${N}`}</span>
              <button onClick={e => { e.stopPropagation(); goNext(); }} onPointerDown={e => e.stopPropagation()}
                disabled={turned === N && !endHold}
                style={{ fontSize:9, fontFamily:'monospace', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                  padding:'4px 10px', borderRadius:5, border:'1px solid rgba(56,189,248,0.4)',
                  color:'#38bdf8', background:'transparent', cursor:'pointer', opacity: (turned === N && !endHold) ? 0.3 : 1 }}>
                {endHold ? 'close ✕' : 'next →'}
              </button>
            </>
          )}
          <button onClick={e => { e.stopPropagation(); toggleExpanded(); resetIdle(); }} onPointerDown={e => e.stopPropagation()}
            style={{ fontSize:9, fontFamily:'monospace', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
              padding:'4px 10px', borderRadius:5, border:'1px solid rgba(56,189,248,0.4)',
              color:'#38bdf8', background:'transparent', cursor:'pointer', userSelect:'none',
              display:'flex', alignItems:'center', gap:5 }}>
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1 4H4V1M6 1V4H9M9 6H6V9M4 9V6H1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> Collapse
          </button>
          <span style={{ fontSize:8, fontFamily:'monospace', color:'rgba(56,189,248,0.3)', textTransform:'uppercase', letterSpacing:'0.1em' }}>
            esc to close
          </span>
        </div>
      )}
    </div>
  );
}

function ShelfRow({ row, onOpen }: { row: Book[]; onOpen: (b: Book) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className="w-full">
      <div className="flex items-end gap-1 px-1 relative" style={{ height: SHELF_H + 20 }}>
        <div className="absolute left-0 top-0 bottom-8 w-6 flex items-center justify-center"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-sky-400/50 dark:text-sky-600/50 select-none">
            {rangeLabel(row)}
          </span>
        </div>
        <div className="flex items-end gap-1 pl-7">
          {row.map(book => {
            const isHov    = hovered === book.id;
            const isToRead = book.status === 'to-read';
            return (
              <button key={book.id} onClick={() => onOpen(book)}
                onMouseEnter={() => setHovered(book.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex-shrink-0 cursor-pointer focus:outline-none"
                title={book.title}
                style={{
                  width: book.spineW, height: SHELF_H,
                  transform: isHov ? 'translateY(-14px)' : isToRead ? 'translateY(-4px)' : 'translateY(0)',
                  opacity: isToRead && !isHov ? 0.55 : 1,
                  transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s, box-shadow 0.2s',
                  boxShadow: isHov ? `0 12px 28px ${book.spineAccent}55, 0 4px 10px rgba(0,0,0,0.25)` : '0 2px 6px rgba(0,0,0,0.12)',
                }}>
                <div className="w-full h-full rounded-t-sm flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(to right, ${book.spineAccent}22, ${book.spineAccent}18)`, borderLeft: `3px solid ${book.spineAccent}`, borderTop: `1px solid ${book.spineAccent}44`, borderRight: `1px solid ${book.spineAccent}22` }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(0,0,0,0.08) 100%)' }} />
                  <span className="text-sky-950 dark:text-sky-100 text-[9px] font-bold leading-snug px-0.5 text-center" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', maxHeight: SHELF_H - 12, overflow: 'hidden', userSelect: 'none' }}>
                    {book.shortTitle}
                  </span>
                  {isToRead  && <div style={{ position:"absolute", top:8, left:"50%", transform:"translateX(-50%)", width:6, height:6, borderRadius:"50%", background:"rgba(251,191,36,0.85)" }} />}
                  {!isToRead && <div style={{ position:"absolute", top:8, left:"50%", transform:"translateX(-50%)", width:6, height:6, borderRadius:"50%", background:"rgba(16,185,129,0.75)" }} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full rounded-sm" style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.25) 10%, rgba(148,163,184,0.4) 50%, rgba(148,163,184,0.25) 90%, transparent)', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }} />
    </div>
  );
}

const AVG_SPINE_W = 36;
const SPINE_GAP   = 4;
const RANGE_LABEL_W = 28;
const MIN_PER_ROW = 3;
const MAX_PER_ROW = 10;

const TECH_GENRES    = Array.from(new Set(BOOKS.filter(b => b.section === 'technical').flatMap(b => b.genres))).sort();
const NONTECH_GENRES = Array.from(new Set(BOOKS.filter(b => b.section === 'nontechnical').flatMap(b => b.genres))).sort();

function calcBooksPerRow(containerW: number): number {
  const usable = containerW - RANGE_LABEL_W - 8;
  const perRow = Math.floor(usable / (AVG_SPINE_W + SPINE_GAP));
  return Math.max(MIN_PER_ROW, Math.min(MAX_PER_ROW, perRow));
}

export default function Bookshelf() {
  const [openBook,   setOpenBook]   = useState<Book | null>(null);
  const [activeGenres, setActiveGenres] = useState<Set<string>>(new Set());
  const [perRow,     setPerRow]     = useState(BOOKS_PER_ROW);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    BOOKS.filter(b => b.status === 'read').forEach((book, i) => {
      setTimeout(() => { new Image().src = `/api/cover/${book.isbn}`; }, i * 200);
    });
  }, []);

  useEffect(() => {
    const update = () => {
      const w = containerRef.current?.offsetWidth ?? window.innerWidth;
      setPerRow(calcBooksPerRow(w));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const toggleGenre = useCallback((g: string) => setActiveGenres(prev => {
    const next = new Set(prev);
    next.has(g) ? next.delete(g) : next.add(g);
    return next;
  }), []);

  const filterBooks = (books: Book[]) =>
    activeGenres.size > 0 ? books.filter(b => b.genres.some(g => activeGenres.has(g))) : books;

  const techRows    = chunkRows(filterBooks(sortedSection('technical')),    perRow);
  const nontechRows = chunkRows(filterBooks(sortedSection('nontechnical')), perRow);

  return (
    <div ref={containerRef} className="w-full pb-16">
      {(() => {

        const pill = (g: string, label: string) => (
          <button key={label} onClick={() => toggleGenre(g)}
            style={{ fontSize:8, fontFamily:"monospace", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.15em",
              padding:"3px 9px", borderRadius:20, cursor:"pointer", transition:"all 0.15s",
              border: activeGenres.has(g) ? "1px solid rgba(56,189,248,0.6)" : "1px solid rgba(56,189,248,0.2)",
              color: activeGenres.has(g) ? "#38bdf8" : "rgba(56,189,248,0.4)",
              background: activeGenres.has(g) ? "rgba(56,189,248,0.08)" : "transparent" }}>
            {label}
          </button>
        );
        return (
          <div style={{ paddingBottom:12, paddingTop:4, display:"flex", flexDirection:"column", gap:8 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
              <span style={{ fontSize:7, fontFamily:"monospace", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.2em", color:"rgba(56,189,248,0.3)", whiteSpace:"nowrap" }}>Filter</span>
              <button onClick={() => setActiveGenres(new Set())}
                style={{ fontSize:8, fontFamily:"monospace", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.15em",
                  padding:"3px 9px", borderRadius:20, cursor:"pointer", transition:"all 0.15s",
                  border: activeGenres.size === 0 ? "1px solid rgba(56,189,248,0.6)" : "1px solid rgba(56,189,248,0.2)",
                  color: activeGenres.size === 0 ? "#38bdf8" : "rgba(56,189,248,0.4)",
                  background:"transparent" }}>
                All
              </button>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
              <span style={{ fontSize:7, fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.18em", color:"rgba(56,189,248,0.25)", whiteSpace:"nowrap" }}>Technical</span>
              {TECH_GENRES.map(g => pill(g, g))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
              <span style={{ fontSize:7, fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.18em", color:"rgba(56,189,248,0.25)", whiteSpace:"nowrap" }}>Fiction</span>
              {NONTECH_GENRES.map(g => pill(g, g))}
            </div>
          </div>
        );
      })()}

      <div className="flex items-center gap-3 py-5 px-1">
        <div style={{ flex:1, height:1, background:"rgba(56,189,248,0.12)" }} />
        <div style={{ display:"flex", alignItems:"center", gap:6, padding:"2px 10px", borderRadius:8, border:"1px solid rgba(56,189,248,0.2)", background:"transparent" }}>
          <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.25em", color:"#38bdf8", opacity:0.7 }}>Technical</span>
        </div>
        <div style={{ flex:1, height:1, background:"rgba(56,189,248,0.12)" }} />
      </div>
      <div className="space-y-0">{techRows.map((row, i) => <ShelfRow key={'t'+i} row={row} onOpen={setOpenBook} />)}</div>

      <div className="flex items-center gap-3 py-5 px-1">
        <div style={{ flex:1, height:1, background:"rgba(56,189,248,0.12)" }} />
        <div style={{ display:"flex", alignItems:"center", gap:6, padding:"2px 10px", borderRadius:8, border:"1px solid rgba(56,189,248,0.2)", background:"transparent" }}>
          <span style={{ fontSize:9, fontFamily:"monospace", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.25em", color:"#38bdf8", opacity:0.7 }}>Non-Technical</span>
        </div>
        <div style={{ flex:1, height:1, background:"rgba(56,189,248,0.12)" }} />
      </div>
      <div className="space-y-0">{nontechRows.map((row, i) => <ShelfRow key={'n'+i} row={row} onOpen={setOpenBook} />)}</div>

      <div style={{ paddingTop:16, paddingLeft:4, display:"flex", alignItems:"center", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{ width:8, height:8, borderRadius:"50%", background:"rgba(16,185,129,0.7)" }} /><span style={{ fontSize:9, fontFamily:"monospace", color:"rgba(56,189,248,0.45)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Read</span></div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{ width:8, height:8, borderRadius:"50%", background:"rgba(251,191,36,0.7)" }} /><span style={{ fontSize:9, fontFamily:"monospace", color:"rgba(56,189,248,0.45)", textTransform:"uppercase", letterSpacing:"0.1em" }}>To read</span></div>
        <span style={{ fontSize:9, fontFamily:"monospace", color:"rgba(56,189,248,0.3)", marginLeft:"auto" }}>hover · click to open</span>
      </div>

      {openBook && <Book3DModal book={openBook} onClose={() => setOpenBook(null)} />}
    </div>
  );
}