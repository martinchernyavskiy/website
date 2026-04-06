export interface FlashCard {
  front: string;
  back: string;
}

export interface ConceptDeck {
  id: string;
  label: string;
  group: string;
  groupLabel: string;
  courses: string[];
  cards: FlashCard[];
}

export const GROUP_LABELS: Record<string, string> = {
  "hardware": "Hardware",
  "systems-prog": "Systems Programming",
  "memory": "Memory Systems",
  "os": "Operating Systems",
  "concurrency": "Concurrency",
  "data": "Data Systems",
  "networking": "Networking",
  "distributed": "Distributed Systems",
  "ai": "AI & Machine Learning",
};

export const ALL_DECKS: ConceptDeck[] = [
  {
    id: "binary-info",
    label: "Binary Information &amp; Voltage Levels",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What is the difference between digital and analog data?", back: "Digital: discrete set of values with defined restrictions. Analog: continuous range of values with no defined minimum or maximum." },
    { front: "Why do digital systems restrict voltage to just two levels?", back: "It simplifies transistor design to on/off switches and provides noise tolerance. The gap between the two voltage ranges absorbs electrical noise without flipping a bit." },
    { front: "How many distinct values can n wires transmit simultaneously?", back: "2^n. Each wire carries one bit (two states), so n wires produce 2^n unique combinations." },
    { front: "Can a computer determine the meaning of a binary sequence from the bits alone?", back: "No. The same bit pattern can represent an integer, a character, or an instruction. Meaning depends on which instructions the program uses to process the data." },
    { front: "What does a wire transmitting a bit mean?", back: "A single wire is at a high or low voltage at any moment, representing 1 or 0. To represent more than two values you need multiple wires, each carrying one bit." },
    { front: "What is ASCII?", back: "American Standard Code for Information Interchange. Uses 7 bits to encode 128 characters: uppercase and lowercase letters, digits, punctuation, and control characters." },
    { front: "What is UTF-8?", back: "A variable-width encoding where ASCII characters use 1 byte and other Unicode characters use 2 to 4 bytes. The first 128 code values match ASCII exactly. Default encoding for XML and HTML." },
    { front: "How do you convert between binary and hexadecimal?", back: "Group binary digits in sets of 4 from right to left and substitute the equivalent hex digit for each group. Reverse to go hex to binary. Works because 16 = 2^4, so one hex digit represents exactly all combinations of 4 bits." },
    { front: "How do you convert a decimal number to binary?", back: "Find the largest power of 2 that fits, place a 1 at that position and subtract it from the value. Repeat with the remainder, placing 0 wherever a power of 2 exceeds the remaining value." },
    { front: "What is digit overflow in counting?", back: "When all digits are at their maximum value and incrementing would require an extra digit, the count wraps back to zero. The result cannot be represented in the available number of digits." },
    { front: "What is Moore's Law?", back: "Gordon Moore's observation that the number of transistors on a chip roughly doubles every two years, with cost per transistor halving accordingly. The first transistor was in 1947; Intel's first microprocessor in 1971." }
    ],
  },
  {
    id: "logic-gates",
    label: "Logic Gates &amp; Transistors",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What is a logic gate?", back: "An electrical circuit made of transistors that connects its output to power (1) or ground (0) based on the input voltages." },
    { front: "What is a Field-Effect Transistor (FET)?", back: "A voltage-controlled transistor that acts as a microscopic switch. It either allows or blocks current flow between its output terminals based on the input voltage." },
    { front: "How do N-type and P-type FETs behave differently?", back: "N-type: input 1 closes the switch (conducts), input 0 opens it. P-type: input 0 closes the switch, input 1 opens it. They are complementary." },
    { front: "How is a NOT gate built from transistors?", back: "A PFET connects output to power and an NFET connects output to ground. Input 0: PFET conducts, output = 1. Input 1: NFET conducts, output = 0." },
    { front: "How do transistor arrangements map to logic operations?", back: "Transistors in series implement AND (all must conduct). Transistors in parallel implement OR (any one conducting is enough)." },
    { front: "What do the symbols for AND, OR, XOR, and NOT gates look like?", back: "NOT: triangle with bubble. AND: elongated D shape. OR: three curved sides, shield-like. XOR: OR with an extra curved line on the input side. Adding a bubble to any gate's output gives its complement." },
    { front: "What are pins in a logic circuit?", back: "The connection points where wires attach to gates. Boolean variables are voltage signals traveling between gates over wires." }
    ],
  },
  {
    id: "logic-functions",
    label: "Boolean Logic Functions",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What are the three fundamental Boolean logic operators and their notation?", back: "AND (dot · or omitted), OR (plus +), NOT (overbar). These are sufficient to express any Boolean function." },
    { front: "How do you derive a Boolean function from a truth table?", back: "OR together the product terms (AND of inputs) for all rows where the output is 1. Each product term represents one row that produces a 1." },
    { front: "When are two Boolean functions logically equivalent?", back: "When their truth tables produce identical outputs for every possible input combination." },
    { front: "What is the operator precedence for Boolean logic?", back: "NOT (highest) → AND → OR (lowest). Parentheses override the default order. DeMorgan's: NOT over AND turns into OR, and vice versa." },
    { front: "What is XOR and what makes it an 'odd function'?", back: "XOR (exclusive OR) outputs 1 when exactly one input is 1 (for two inputs). When XOR'ing more than two operands, the output is 1 only when an odd number of inputs are 1." },
    { front: "What is the difference between a Boolean operator and a bitwise operator?", back: "A Boolean operator works on single truth values (true/false). A bitwise operator applies the Boolean operation independently to each corresponding bit position of N-bit operands." }
    ],
  },
  {
    id: "combinational-circuits",
    label: "Combinational Circuits",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What defines a combinational circuit?", back: "A logic circuit whose output depends only on the current input values. No memory, no stored information, no dependence on past behavior." },
    { front: "What is the simplest example of a combinational circuit?", back: "A single logic gate. Its output is determined entirely by its current inputs." },
    { front: "How does a Boolean function relate to a circuit's physical construction?", back: "Gates and connections follow directly from the Boolean expression. Operator precedence determines the gate structure. Multiple circuits can implement the same function because logically equivalent expressions exist." },
    { front: "What is a waveform diagram?", back: "A graph showing how signal values (0s and 1s) change over time. As inputs change, the combinational circuit's output changes accordingly." }
    ],
  },
  {
    id: "decoders-mux",
    label: "Decoders &amp; Multiplexers",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What does a decoder do?", back: "Converts an n-bit input into a one-hot 2^n-bit output. Exactly one output line is active for each input combination: the line whose label matches the input value." },
    { front: "Give examples of decoder sizes.", back: "1-to-2, 2-to-4, 3-to-8 decoder. An n-bit input produces 2^n output lines." },
    { front: "How are decoder pins labeled?", back: "Input pins are labeled by their bit position in the binary number they form. Output labels reflect the input code that activates each line." },
    { front: "What does a multiplexer do?", back: "Selects one of 2^n data input lines to drive a single output, controlled by n select lines. A decoder inside interprets the select input to route the chosen data line." },
    { front: "How is a multiplexer named?", back: "By its input-to-output ratio. A 4-to-1 MUX has 4 data inputs, 2 select lines, and 1 output. The select value determines which data line appears at the output." },
    { front: "What is a good analogy for decoders vs. multiplexers?", back: "Decoder: like a phone system where dialing a number makes exactly one phone ring. Multiplexer: like a TV channel selector where you pick one input signal to display on one screen." }
    ],
  },
  {
    id: "adders",
    label: "Adders &amp; Arithmetic Circuits",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What is a half-adder?", back: "A combinational circuit that adds two single-bit inputs and produces a sum bit and a carry-out. It does not accept a carry-in." },
    { front: "What is a full adder?", back: "Takes three inputs: two addend bits and a carry-in from the position to the right. Outputs a sum bit and a carry-out to the next position left." },
    { front: "What is a ripple-carry adder?", back: "A chain of full adders where each carry-out feeds into the carry-in of the next higher bit position. Called ripple because a carry can propagate from the least to most significant bit." },
    { front: "When does unsigned overflow occur in a ripple-carry adder?", back: "When there is a carry-out from the most significant bit position. The sum cannot be represented in the given number of bits." },
    { front: "What is 2's complement representation?", back: "A way to represent both positive and negative integers. Positive numbers start with 0 and use normal positional notation. Negative numbers start with 1. For N bits the range is -2^(N-1) to 2^(N-1) - 1." },
    { front: "How do you negate a number in 2's complement?", back: "Complement every bit (flip 0s to 1s and 1s to 0s) then add 1. Example: 0010 (+2) becomes 1101 + 1 = 1110 (-2)." },
    { front: "What is sign extension vs. zero extension?", back: "Zero extension: fill new high-order bits with 0s (works for unsigned numbers only). Sign extension: replicate the sign bit into all new bits (required for signed 2's complement numbers to preserve the value)." },
    { front: "How do you detect signed overflow?", back: "Overflow occurs when both operands have the same sign but the result has the opposite sign. If operands have opposite signs, overflow cannot occur. Carry-out from the MSB does not indicate signed overflow." },
    { front: "What is fixed-point binary?", back: "A format where the radix point is defined at a fixed position in the binary number. The number of fractional bits must be decided in advance. Converting to fixed-point is the same as integer conversion but includes negative exponents." },
    { front: "What is floating-point representation?", back: "A format that encodes the radix point position in the number itself rather than fixing it. Like scientific notation: a significand times a base raised to an exponent. The exponent determines where the radix point falls." },
    { front: "What is the IEEE 32-bit floating-point format?", back: "Bit 31 is the sign bit. Bits 30-23 (8 bits) are the exponent field. Bits 22-0 (23 bits) are the significand. Value = (-1)^sign * 1.significand * 2^(exponent - 127). The hidden leading 1 means the format cannot represent zero directly, requiring special cases." },
    { front: "Why does IEEE floating-point use a bias of 127?", back: "The bias allows the exponent field to be treated as an unsigned integer for comparison purposes. The actual exponent is the stored value minus 127, giving a range from -126 to +127. This avoids using 2's complement for the exponent." },
    { front: "What is the difference between range and precision in number formats?", back: "Range: the span from the smallest to largest representable value. Precision: the number of significant digits. Floating-point has a larger range than fixed-point but precision depends on the significand bits plus the hidden bit. Integer and fixed-point formats have all digits significant." }
    ],
  },
  {
    id: "sequential-circuits",
    label: "Sequential Circuits &amp; Flip-Flops",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What is the key difference between combinational and sequential circuits?", back: "Combinational: output depends only on current inputs, no memory. Sequential: output depends on current inputs and stored state, it remembers past information." },
    { front: "What is a D flip-flop?", back: "A 1-bit storage element with a data input D, output Q, and a clock input. It captures D and stores it in Q on the rising edge of the clock." },
    { front: "What is a clock signal?", back: "A signal that oscillates between 1 and 0 at a fixed frequency. The clock period is the time for one full cycle. Flip-flops use the rising edge (0 to 1 transition) as the trigger to update." },
    { front: "What do current state and next state mean for a flip-flop?", back: "Current state: the value currently stored. Next state: the value that will be captured at the next rising clock edge. Between edges the stored value is stable." },
    { front: "Why is a D flip-flop edge-sensitive?", back: "It only updates at the exact moment of the clock's rising edge, not while the clock is steadily high or low." },
    { front: "What is a register with enable?", back: "A register that only updates when the enable signal EN is 1. When EN is 0 it holds its current value. Implemented by adding a multiplexer that chooses between the current output and the new input, with EN as the select signal." },
    { front: "How does hardware memory work?", back: "Memory is an array of registers indexed by address. An M-bit address selects one of 2^M locations, each storing an N-bit word. The Write Enable signal (WE) controls direction: WE=1 writes, WE=0 reads. Capacity = 2^M * N bits." }
    ],
  },
  {
    id: "fsm",
    label: "Finite State Machines",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What is a Finite State Machine?", back: "A system with a finite number of states where transitions are determined by inputs and outputs depend on the current state. Sequential circuits are FSMs because their state is stored in flip-flops." },
    { front: "What is a state diagram?", back: "A visual representation of an FSM showing states as circles and transitions as labeled arrows. N flip-flops can represent 2^N states." },
    { front: "What are the three components of an FSM circuit?", back: "Flip-flops (store current state), next-state combinational logic (computes next state from current state and inputs), and output logic (computes outputs from current state)." },
    { front: "What is an unconditional transition in an FSM?", back: "A state transition that happens on every clock edge regardless of input values. Transition arrows are unlabeled. A simple counter advancing on every rising edge is an example." },
    { front: "What is a state table?", back: "A tabular representation of an FSM listing every combination of current state and input, with the resulting next state and output for each." },
    { front: "How many flip-flops are needed for an FSM with S states?", back: "Ceiling of log2(S). Each flip-flop stores one bit of state, so n flip-flops support up to 2^n states." }
    ],
  },
  {
    id: "processor-model",
    label: "Processor Model (ALU, Registers, CU)",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What are the two main components of a processor?", back: "Processing Unit (ALU plus Register File, does computation) and Control Unit (fetches and decodes instructions, orchestrates execution using PC and IR)." },
    { front: "What does the ALU do and how is its output selected?", back: "The ALU performs arithmetic and bitwise logic operations in parallel. A multiplexer controlled by a mode select signal picks which operation result to output. Only one result is needed per instruction." },
    { front: "What is a register file?", back: "Small, fast memory located near the ALU. Contains multiple registers that can be read simultaneously but written one at a time. Much faster than main memory." },
    { front: "What two special registers does the Control Unit contain?", back: "Program Counter (PC): address of the next instruction to fetch. Instruction Register (IR): the current instruction being decoded and executed." },
    { front: "What is the von Neumann compute model?", back: "Both program instructions and data are stored in the same memory. Different programs run by writing different instructions into memory (the stored program concept)." },
    { front: "How does the Control Unit process an instruction?", back: "It reads the instruction from memory at the PC address, stores it in IR (fetching), increments PC, then decodes IR and generates control signals for the ALU, register file, and memory." }
    ],
  },
  {
    id: "isa",
    label: "Instruction Set Architecture",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252", "CS 354"],
    cards: [
    { front: "What is an Instruction Set Architecture?", back: "The contract between hardware and software. It specifies instruction formats, opcodes, registers, addressing modes, and data types. Software written for one ISA runs on any processor implementing it." },
    { front: "Where does the ISA sit in the abstraction hierarchy?", back: "At the boundary between software and hardware. Above it: programs and algorithms. Below it: microarchitecture, logic circuits, and devices." },
    { front: "What are the three categories of LC-3 instructions?", back: "Operate (ALU computation), Data Movement (load/store between registers and memory), Control (branches and jumps that modify PC)." },
    { front: "How wide are LC-3 instructions and what does the opcode field specify?", back: "16 bits wide. Bits [15:12] are the 4-bit opcode identifying the instruction type (ADD, AND, BR, LD, ST, JMP, etc.)." },
    { front: "How many registers does the LC-3 have?", back: "8 registers (addressed with 3 bits), each 16 bits wide." },
    { front: "What is an immediate operand in the LC-3?", back: "A small constant embedded directly in the instruction as a 5-bit field. It is sign-extended to 16 bits before use." },
    { front: "What are condition codes in the LC-3?", back: "Three 1-bit flags (N, Z, P) indicating whether the most recent result was Negative, Zero, or Positive. Exactly one is set at a time. Updated by Operate and Load instructions." },
    { front: "What are the LC-3 memory addressing modes?", back: "PC-relative (PC plus a signed offset), Base+Offset (register value plus an offset), and Indirect (load an address from memory, then load the value at that address)." },
    { front: "What are JSR and RET in LC-3?", back: "JSR (Jump to SubRoutine) saves the return address in R7 then jumps to the subroutine. RET returns by jumping to the address in R7. If a subroutine calls another, R7 must be saved to memory before the nested call." },
    { front: "What is context save and restore in LC-3 subroutines?", back: "Before using any registers a subroutine stores their values to memory with ST instructions. Before returning it restores them with LD instructions. This callee-save approach leaves the caller's register state unchanged." },
    { front: "What is PC-relative addressing in LC-3?", back: "Memory addresses for LD and ST are computed as the already-incremented PC plus a signed 9-bit offset (PCoffset9). This limits directly addressable locations to within 256 addresses above or below the current instruction." },
    { front: "What are the essential LC-3 register programming patterns?", back: "Clear register: AND R, R, #0. Initialize to value: AND then ADD with immediate. Copy register: ADD Rdst, Rsrc, #0. Subtract: NOT, ADD #1, then ADD. Mask a bit: AND with immediate having 1 only at that position." },
    { front: "What are LDR and STR (base+offset addressing)?", back: "LDR DR, BaseR, offset6: loads the value at address (BaseR + offset6) into DR. STR SR, BaseR, offset6: stores the value in SR to address (BaseR + offset6). The base register is one of the 8 general-purpose registers, offset6 is a 6-bit signed value." },
    { front: "What is LEA (Load Effective Address)?", back: "LEA DR, label: computes the address of the label using PC-relative addressing and stores that address (not the value at that address) into DR. DR can then be used as a base register for subsequent LDR/STR instructions." },
    { front: "What are LDI and STI?", back: "Indirect load and store: LDI reads a memory address from a label's location, then reads the value at that address. STI stores a value to the address held at the label's memory location. They are two-step instructions: get the address, then use it." },
    { front: "What are the LC-3 memory allocation directives?", back: ".FILL value: allocates one word initialized to value. .BLKW count: allocates count uninitialized words. .STRINGZ text: allocates count+1 words initialized to the ASCII codes of each character followed by a null terminator (0)." }
    ],
  },
  {
    id: "instruction-cycle",
    label: "Fetch-Decode-Execute Cycle",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What are the six phases of the instruction cycle?", back: "Fetch, Decode, Evaluate Address, Fetch Operands, Execute, Store Result. Not all instructions use all phases." },
    { front: "What happens during the Fetch phase?", back: "Read the instruction from memory at the address in PC, store it in IR, then increment PC. Required for every instruction." },
    { front: "What happens during the Decode phase?", back: "Examine the opcode to determine the instruction type, then identify the operands from the bit fields in the instruction. Required for every instruction." },
    { front: "Which phases does an Operate instruction use?", back: "Fetch, Decode, Fetch Operands (read source registers or extract immediate), Execute (ALU operation), Store Result (write to destination register)." },
    { front: "Which phases does a Load instruction use?", back: "Fetch, Decode, Evaluate Address (compute memory address), Fetch Operands (read from that memory address), Store Result (write value to destination register)." },
    { front: "Which phases does a Store instruction use?", back: "Fetch, Decode, Evaluate Address (compute memory address), Fetch Operands (read value from source register), Execute (write value to memory at the computed address)." },
    { front: "Which phases does a Control instruction use?", back: "Fetch, Decode, Evaluate Address (compute branch target), Execute (check condition; if true, update PC with the target address)." },
    { front: "Why is the Control Unit itself a finite state machine?", back: "It performs different tasks in each phase of the instruction cycle. Its behavior depends on the current phase (state) and the instruction being processed (input)." },
    { front: "How does the LC-3 BR instruction work?", back: "The NZP bits in the instruction are compared to the current condition codes. If any match, PC is updated to PC plus the sign-extended PCoffset9. Otherwise PC is unchanged." },
    { front: "What is a JMP instruction?", back: "An unconditional jump that updates PC with the value in a base register. No condition is checked." }
    ],
  },
  {
    id: "io-concepts",
    label: "I/O: Polling, Interrupts, Memory-Mapped",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What are I/O devices?", back: "Devices that receive data from outside the computer (input, like a keyboard) or send data out (output, like a monitor). Most handle both directions." },
    { front: "What is a GPIO pin?", back: "General-Purpose I/O pin. A single pin configurable as a 1-bit input (read a button state) or 1-bit output (drive an LED)." },
    { front: "What is asynchronous I/O?", back: "I/O that operates at unpredictable times unrelated to the processor clock. The processor must check whether the device needs service. This coordination is called handshaking." },
    { front: "What is the difference between unconditional and conditional I/O?", back: "Unconditional: simple devices always ready, processor transfers data without checking. Conditional: most devices require the processor to check readiness before transferring data." },
    { front: "What is the difference between isolated and memory-mapped I/O?", back: "Isolated: I/O has its own address space accessed with special instructions. Memory-mapped: I/O registers are assigned memory addresses and accessed with normal load/store instructions." },
    { front: "What is the difference between polling and interrupt-driven I/O?", back: "Polling: CPU repeatedly checks device status registers, wasting cycles. Interrupt-driven: device signals the CPU when ready, CPU suspends current work, runs an interrupt service routine, then resumes." },
    { front: "What is an interrupt service routine?", back: "A subroutine invoked automatically by hardware in response to an interrupt signal. When it finishes, the processor resumes executing the main program." },
    { front: "What are the three categories of I/O device interface registers?", back: "Status registers (CPU reads to check device state), Data registers (exchange data between CPU and device), Control registers (CPU writes to configure device behavior)." },
    { front: "What are the LC-3 keyboard interface registers?", back: "KBSR (Keyboard Status Register) at address xFE00: bit 15 is 1 when a new character is available. KBDR (Keyboard Data Register) at xFE02: bits 7-0 hold the ASCII code of the last typed character. Reading KBDR resets bit 15 of KBSR." },
    { front: "What are the LC-3 display interface registers?", back: "DSR (Display Status Register) at address xFE04: bit 15 is 1 when the display is ready for a new character. DDR (Display Data Register) at xFE06: writing a character here displays it on the screen. Poll DSR until ready before writing to DDR." },
    { front: "What is a TRAP instruction in LC-3?", back: "An instruction (opcode 1111) that requests an OS service. The 8-bit operand (trap vector) is zero-extended and used to look up the service routine's address in the trap vector table at addresses x0000 to x00FF. The return address is saved in R7." },
    { front: "What are the common LC-3 TRAP codes?", back: "x20 GETC: wait for and return keyboard character in R0. x21 OUT: write character in R0 to display. x22 PUTS: write ASCIIZ string starting at R0 to display. x23 IN: prompt, wait for key, echo it, return in R0. x25 HALT: transfer control to OS and stop." }
    ],
  },
  {
    id: "abstraction-layers",
    label: "Abstraction Layers",
    group: "hardware",
    groupLabel: "Hardware",
    courses: ["ECE 252"],
    cards: [
    { front: "What are the 7 abstraction layers from top to bottom?", back: "Problem Statement, Algorithm, Program, ISA, Microarchitecture, Logic Circuits, Devices (transistors). Software is above the ISA boundary; hardware is below." },
    { front: "Why do we use abstraction layers?", back: "To manage complexity. Each layer hides the details of the layer below, allowing specialized teams to work independently and enabling systems with billions of transistors to be built." },
    { front: "What is the role of the ISA layer?", back: "It is the boundary between software and hardware. It specifies what the hardware can do and how software controls it. Any software written to an ISA runs on any processor that implements it." },
    { front: "What transforms a program into the ISA layer?", back: "A compiler (for high-level languages) or an assembler (for assembly). The compiler is itself a program that runs on the processor and produces binary instruction sequences." },
    { front: "What is the difference between high-level and low-level languages?", back: "High-level: abstract from hardware and portable across systems (C, Python). Low-level: closely tied to a specific instruction set (assembly). Both ultimately become machine code." },
    { front: "How is hardware designed below the ISA layer?", back: "Microarchitecture is described in Hardware Description Languages (HDL) and tested in simulation. CAD tools transform the design to the transistor level, implementing billions of transistors." },
    { front: "What is a Turing Machine?", back: "A theoretical model of computation by Alan Turing. It reads and writes symbols on an infinite tape, choosing actions from a fixed set of rules based on the current symbol and machine state. Any computable computation can be implemented by some Turing Machine." },
    { front: "What is a Universal Turing Machine?", back: "A Turing Machine that simulates any other Turing Machine by reading a description of its rules as input. A programmable computer is effectively a UTM but with finite memory." },
    { front: "What makes a computer faster?", back: "Faster clock rate, more parallel hardware structures, more complex single-step operations, and faster or larger memory closer to the processor." },
    { front: "What are the design trade-offs in computer hardware?", back: "Faster devices need more hardware and cost more power. Cheaper devices have fewer transistors and less specialized hardware. Lower-power devices run slower because of reduced operating voltage." },
    { front: "What is an operating system?", back: "Software that acts as an intermediate layer between application software and the system hardware. It provides services to applications and manages both software and hardware resources." },
    { front: "What services does an OS provide to applications?", back: "I/O services (handles all direct device contact), file system management (create, read, write, protect files), network communication, application scheduling, resource allocation, error handling, and process protection." },
    { front: "How does a two-pass assembler work?", back: "First pass: reads the source file to verify syntax and build a symbol table mapping each label to its memory address. Second pass: encodes each instruction and directive into binary, using the symbol table to resolve label references into actual addresses." }
    ],
  },
  {
    id: "c-basics",
    label: "C Language Fundamentals",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "How does C handle boolean values?", back: "No native bool type. False is 0, NULL, or '\0'. True is any nonzero value, including nonzero chars." },
    { front: "Why must variables and functions be declared before use in C?", back: "C is a one-pass compiler. It reads source top to bottom once, so every identifier must be declared before it is referenced. That is why main() is usually at the bottom." },
    { front: "What is the difference between an argument and a parameter?", back: "Argument: the value the caller passes in. Parameter: the variable in the callee that receives a copy of that value." },
    { front: "What is pass-by-value in C?", back: "A copy of the argument is made and stored in the parameter. The callee cannot affect the caller's original variable. Pass the address instead to modify the original." },
    { front: "What is a dangling else?", back: "When multiple ifs precede one else, the compiler attaches the else to the nearest if regardless of indentation. Use curly braces to explicitly group." },
    { front: "What are the common printf format specifiers?", back: "%d/%i (integer), %c (character), %s (string), %x (hex), %p (address). \n flushes the output buffer." },
    { front: "What is the difference between stack and heap memory?", back: "Stack: automatically managed, stores locals and parameters in frames, freed on function return. Heap: manually managed with malloc/free, persists until explicitly freed, allocated at runtime." },
    { front: "What is a call stack trace?", back: "Manually simulating execution by tracking function calls, frame allocation, and returns. The top frame is executing; frames below are waiting for their callee to return (LIFO)." },
    { front: "What are the key C standard library headers?", back: "stdio.h: printf, scanf, fgets, file I/O. stdlib.h: malloc, free, exit. string.h: strlen, strcmp, strcpy, strcat." },
    { front: "How do command-line arguments work in C?", back: "int main(int argc, char *argv[]). argc is the count including the program name. argv[0] is always the executable name, argv[1] is the first real argument." },
    { front: "What is endianness?", back: "The byte ordering of a multi-byte value in memory. Little-endian (IA-32): least significant byte at the lowest address. Big-endian: most significant byte at the lowest address." },
    { front: "What do fopen and fclose do?", back: "fopen(filename, mode) opens a file and returns a FILE pointer, or NULL on failure. Modes include \"r\" (read) and \"w\" (write). fclose(stream) flushes and closes the file." },
    { front: "What is the difference between printf/scanf and fprintf/fscanf?", back: "printf/scanf use stdout/stdin. fprintf/fscanf take a FILE* as the first argument and operate on any stream, including files." },
    { front: "What do sscanf and sprintf do?", back: "sscanf reads formatted input from a string. sprintf writes formatted output into a string. Both take the string as their first argument instead of a stream." }
    ],
  },
  {
    id: "pointers",
    label: "Pointers &amp; Address Arithmetic",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What is a pointer in C?", back: "A scalar variable whose value is a memory address. Always 4 bytes on IA-32 regardless of what type it points to." },
    { front: "What do the & and * operators do?", back: "& returns the memory address of a variable. * dereferences a pointer, accessing the value at the stored address." },
    { front: "What happens when you dereference a NULL pointer?", back: "It tries to access address 0, which the OS reserves. This causes a segmentation fault." },
    { front: "What is pointer arithmetic and how does scaling work?", back: "Adding integer i to pointer p gives p + (i * sizeof(*p)). The compiler scales the offset by element size automatically. *(a+i) is the same as a[i]." },
    { front: "What is a dangling pointer?", back: "A pointer holding the address of memory that has been freed. Dereferencing it causes undefined behavior. Assign NULL after free() to prevent accidental reuse." },
    { front: "What is a memory leak?", back: "Heap memory that was allocated but never freed. The allocator cannot reclaim it, so the process grows in memory over time." },
    { front: "Why can't you return a local variable's address from a function?", back: "Local variables live in the function's stack frame, which is destroyed on return. The address would immediately be dangling. Use heap allocation if data must outlive the function." },
    { front: "How is an uninitialized pointer shown in a memory diagram?", back: "A question mark with a line through it. It does NOT mean zero because C has no garbage collector." },
    { front: "What are the three forms of pass-by-value?", back: "Scalar: copies the value. Pointer: copies the address (callee can modify what it points to). Array: copies the starting address of element 0." }
    ],
  },
  {
    id: "arrays-structs",
    label: "Arrays, Structs &amp; Unions",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "How are stack-allocated arrays stored in memory?", back: "A contiguous fixed-size block. The identifier is a label bound to the starting address and cannot be reassigned. Using it as a destination operand is a compiler error." },
    { front: "How do heap arrays differ from stack arrays?", back: "Heap arrays are created with malloc, which returns a pointer that can be reassigned. Stack array labels cannot. Heap memory must be explicitly freed." },
    { front: "How are 2D arrays laid out on stack vs. heap?", back: "Stack: a single contiguous block in row-major order. m and *m are the same address but different types. Heap: an array of pointers each pointing to a separately allocated row." },
    { front: "How do you access m[i][j] using pointer arithmetic for a stack-allocated 2D array?", back: "*(*m + cols*i + j). For heap: *(m[i] + j). Stack uses row-size scaling; heap uses pointer-size scaling." },
    { front: "In what order must you free a 2D heap array?", back: "Free each row first, then free the pointer array. Freeing the pointer array first loses the row addresses, causing a memory leak." },
    { front: "What is a struct in C?", back: "A user-defined compound type containing data members of different types stored in a contiguous block. Members are accessed with the dot operator, or arrow operator for pointers." },
    { front: "How are structs passed to functions?", back: "By value: the entire struct is copied into the parameter. This is slow for large structs. Pass a pointer instead for efficiency." },
    { front: "What is the arrow operator (->)?", back: "Shorthand for dereferencing a struct pointer and accessing a member. ptr->field is the same as (*ptr).field." },
    { front: "Why do structs contain padding?", back: "To satisfy alignment: members must start at addresses that are multiples of their size. The compiler inserts padding bytes. Total struct size is usually a multiple of its largest member." },
    { front: "What is a union in C?", back: "Like a struct but all fields share the same memory. Allocated only enough space for the largest field. Used for low-level type punning, hardware access, or polymorphism." },
    { front: "What are the IA-32 Linux alignment rules?", back: "short: address must be a multiple of 2. int, float, pointer, double: multiple of 4. The compiler enforces these by inserting padding." }
    ],
  },
  {
    id: "strings",
    label: "C Strings &amp; string.h",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What is a C string?", back: "An array of characters terminated by a null character '\0'. Total size is strlen + 1. Use strcpy to copy, not the assignment operator." },
    { front: "Where are string literals stored?", back: "In the Code Segment (.rodata), which is read-only. char str[] = \"text\" copies the literal to a modifiable stack array." },
    { front: "What do strlen, strcmp, strcpy, and strcat do?", back: "strlen: length excluding '\0'. strcmp: lexicographic comparison (negative, 0, or positive). strcpy: copies source into destination. strcat: appends source to destination. Both copy functions require destination to be large enough." },
    { front: "What is buffer overflow in the context of strings?", back: "Writing past a character array's bounds. gets() is unsafe because it has no size limit. Use fgets() with a size argument instead." }
    ],
  },
  {
    id: "assembly-basics",
    label: "IA-32 Assembly &amp; Registers",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What is assembly language?", back: "A human-readable representation of machine code. Machine-dependent (IA-32 focus here). It removes HLL constructs: no named variables, no types, no control structures." },
    { front: "Why study assembly?", back: "To analyze code for inefficiencies and vulnerabilities, understand stack layout and calling conventions, and see what the compiler actually produces." },
    { front: "How long are IA-32 machine code instructions?", back: "Variable length: 1 to 15 bytes." },
    { front: "How does the machine view memory?", back: "As a flat array of bytes indexed by addresses. The data type of a stored value is determined by how the instruction accesses memory, not by the memory itself." },
    { front: "What are the IA-32 assembly data format suffixes?", back: "b = byte (1B). w = word (2B). l = double word (4B). s = single precision float (4B). t = extended precision (10B)." },
    { front: "Name the 8 IA-32 general-purpose registers and their uses.", back: "%eax (accumulator/return value), %ecx (count), %edx (data), %ebx (base), %esi (source index), %edi (destination index), %esp (stack pointer), %ebp (frame pointer)." },
    { front: "What is %eip and what are the condition code registers?", back: "%eip holds the address of the next instruction. Condition codes (ZF, CF, SF, OF) are 1-bit flags set by the most recent ALU operation, used for conditional branching." },
    { front: "What is the history of IA-32 register widths?", back: "Started as 8-bit (split into high/low halves like %ah/%al), extended to 16-bit (%ax), then 32-bit (%eax). All three names refer to parts of the same physical register." }
    ],
  },
  {
    id: "addressing-modes",
    label: "Operand Specifiers &amp; Addressing Modes",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What are the three operand types in IA-32?", back: "Immediate ($Imm): a constant value. Register (%Ea): value stored in a register. Memory: value at a computed effective address in memory." },
    { front: "What are the four memory addressing mode categories?", back: "Absolute (Imm address), Indirect ((%Eb) register holds address), Indexed ((%Eb,%Ei) sum of two registers), Scaled Index (Imm(%Eb,%Ei,s) base + scaled index + offset)." },
    { front: "What are the constraints on addressing mode operands?", back: "Base and index registers must be 32-bit. Scale factor must be 1, 2, 4, or 8. Immediate cannot be a destination. Memory-to-memory transfers require an intermediate register." },
    { front: "How does base+offset addressing work?", back: "Imm(%Eb): effective address = Imm + R[%Eb]. Used for struct field access and stack local variables." },
    { front: "How does scaled index addressing support arrays?", back: "Imm(%Eb,%Ei,s): address = Imm + R[%Eb] + R[%Ei]*s. Base holds array start, index holds element number, scale matches element size (1, 2, 4, or 8 bytes)." }
    ],
  },
  {
    id: "asm-instructions",
    label: "MOV, LEA, Arithmetic &amp; Shift Instructions",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "How does MOV S,D work?", back: "Copies the source value to the destination (D = S). Size must match the instruction suffix. Memory-to-memory transfers are not allowed." },
    { front: "What do MOVZ and MOVS do?", back: "MOVZ copies with zero extension (extra bits filled with 0). MOVS copies with sign extension (extra bits filled with the sign bit). Destination must be larger than source." },
    { front: "How do PUSH and POP work?", back: "pushl S: decrement %esp by 4, write S to the new top. popl D: read the top into D, increment %esp by 4." },
    { front: "What is the difference between MOV and LEA?", back: "MOV copies the value at an address. LEA computes the effective address and stores the address itself, without accessing memory." },
    { front: "What are the unary arithmetic instructions?", back: "INC (add 1), DEC (subtract 1), NEG (2s complement negate), NOT (bitwise flip). Each operates on a single operand." },
    { front: "What are the binary arithmetic instructions?", back: "ADD, SUB, IMUL, AND, OR, XOR. All are in the form OP S,D where D = D OP S." },
    { front: "How do shift instructions work?", back: "SHL/SHR: logical shift (zero-fill). SAL/SAR: arithmetic shift (sign-fill on right). k is 0 to 31. Left shift multiplies by 2^k, arithmetic right shift divides by 2^k." },
    { front: "What are the key MOV/operand caveats?", back: "Instruction size must match source. Immediate cannot be a destination. Transfers larger than the destination need sign or zero extension. No memory-to-memory without an intermediate register." }
    ],
  },
  {
    id: "condition-codes",
    label: "Condition Codes, CMP, TEST, SET",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What are the four condition code flags?", back: "ZF: result was zero. CF: unsigned overflow (carry out). SF: result was negative. OF: signed 2s complement overflow. All are 1-bit registers set by the last ALU operation." },
    { front: "How do CMP and TEST differ?", back: "CMP S2,S1: computes S1-S2 and sets flags (arithmetic compare). TEST S2,S1: computes S1&S2 and sets flags (bit test). Neither stores the result." },
    { front: "What does testl %eax, %eax do?", back: "ANDs %eax with itself and sets condition codes without modifying the register. Efficiently tests whether a value is zero, negative, or positive." },
    { front: "How do SET instructions work?", back: "Write 1 to a byte register if a condition is true, 0 otherwise. Used after CMP or TEST to capture comparison results in a variable." },
    { front: "What are the SET instructions for unsigned comparisons?", back: "setb: below (CF). setbe: below or equal (CF|ZF). seta: above (~CF&~ZF). setae: above or equal (~CF). These use the carry and zero flags." },
    { front: "What are the SET instructions for signed comparisons?", back: "setl: less (SF^OF). setle: less or equal ((SF^OF)|ZF). setg: greater (~(SF^OF)&~ZF). setge: greater or equal (~(SF^OF)). These use sign and overflow flags." }
    ],
  },
  {
    id: "jumps-loops",
    label: "Jumps, Loops &amp; Control Flow in Assembly",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What are the two types of jump instructions?", back: "Unconditional (jmp): always jumps, direct (label) or indirect (*operand). Conditional (je, jne, jl, jg, etc.): jumps based on condition codes, always direct." },
    { front: "What is the difference between absolute and relative target encoding?", back: "Absolute: 32-bit address in the instruction, not portable if code moves. Relative: signed offset from the next instruction, compact and position-independent." },
    { front: "How is a do-while loop represented in assembly?", back: "A label at the top of the body. The body executes, then a conditional jump back to the label. The body always runs at least once." },
    { front: "How is a while loop represented in assembly?", back: "Test the condition first. If false, jump past the body. If true, run the body and jump back to the test. Most compilers convert while to a do-while form with an initial guard." },
    { front: "How is a for loop represented in assembly?", back: "Initialize the counter, then follow the while pattern: test, body, increment, jump back to test." },
    { front: "What is the best mental model for branch instructions?", back: "Think of them as jumping AROUND code: when a condition is met, skip a block of instructions, rather than jumping TO a destination." }
    ],
  },
  {
    id: "stack-frames",
    label: "Stack Frames &amp; Calling Conventions",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What is a stack frame?", back: "A block of stack memory for one function call. Contains the callee's arguments (stored in the caller's frame), saved return address, saved %ebp, local variables, and temporaries." },
    { front: "How is a function call implemented in assembly?", back: "call Label pushes the return address (next instruction's address) onto the stack and jumps to the label." },
    { front: "How does ret work?", back: "Pops the return address from the stack into %eip, resuming execution at the instruction after the call." },
    { front: "How is a stack frame set up (prologue)?", back: "Push caller's %ebp. Set %ebp = %esp. Subtract from %esp to make room for local variables." },
    { front: "How is a stack frame torn down (epilogue)?", back: "leave: moves %esp = %ebp then pops %ebp. Then ret pops the return address." },
    { front: "How does the callee access its arguments?", back: "At positive offsets from %ebp: 8(%ebp) is the first argument (skipping the saved %ebp and return address, each 4 bytes)." },
    { front: "How does the callee access its local variables?", back: "At negative offsets from %ebp: -4(%ebp) is the first local, -8(%ebp) the second, and so on." },
    { front: "Which registers are caller-saved vs. callee-saved?", back: "Caller-saved (caller preserves if needed): %eax, %ecx, %edx. Callee-saved (callee must restore before returning): %ebx, %esi, %edi. Return value goes in %eax." },
    { front: "How does the caller pass arguments to a function?", back: "Places arguments on the stack at offsets from %esp before calling. The callee reads them at positive %ebp offsets after the frame is set up." },
    { front: "What is the difference between a direct and indirect function call?", back: "Direct (call Label): target address is baked into the instruction. Indirect (call *Operand): target is in a register or memory, used for function pointers." },
    { front: "What is a function pointer?", back: "A pointer holding the address of a function's first instruction. Enables callbacks and jump tables. Declared as: return_type (*ptr)(param_types). Called with the same syntax as a regular function." }
    ],
  },
  {
    id: "buffer-overflow",
    label: "Buffer Overflow &amp; Stack Smashing",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What is a buffer overflow?", back: "Writing past the bounds of an array. C performs no bounds checking, so adjacent memory is silently overwritten." },
    { front: "Why are stack-allocated arrays especially vulnerable?", back: "They sit adjacent to critical control data: the saved %ebp and return address. Overflowing into the return address lets an attacker redirect execution." },
    { front: "How does a stack smashing attack work?", back: "Enter input that contains machine instructions. Overflow a buffer to overwrite the return address with the buffer's address. On return, the exploit code executes." },
    { front: "What was the Morris Worm?", back: "A 1988 worm that took down a large portion of the Internet by exploiting buffer overflow. The first major demonstration of the attack's real-world impact." }
    ],
  },
  {
    id: "ecf",
    label: "Exceptional Control Flow",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What is exceptional control flow?", back: "A mechanism for reacting to unusual events by sidestepping normal sequential execution. Used for kernel services, hardware signals, process switching, and error handling." },
    { front: "What is the difference between synchronous and asynchronous exceptions?", back: "Synchronous: triggered by the currently executing instruction (traps, faults, aborts). Asynchronous: triggered by external hardware events unrelated to the current instruction." },
    { front: "What is an interrupt?", back: "An asynchronous signal from an external device (timer, disk, keyboard). The OS finishes the current instruction, runs the handler, then returns to the next instruction." },
    { front: "What is a trap?", back: "An intentional synchronous exception for system calls. The process executes int $0x80, the OS performs the service, then returns to the next instruction." },
    { front: "What is a fault?", back: "A synchronous, potentially recoverable error (page fault, divide by zero, segfault). The handler may fix the problem and re-execute the faulting instruction, or terminate the process." },
    { front: "What is an abort?", back: "A synchronous, nonrecoverable error (hardware failure, corrupted memory). The process is terminated immediately and does not return." },
    { front: "How does the exception table work?", back: "A jump table allocated at boot. ETBR + exception number * 4 gives the handler's address. Each exception type has a unique number mapped to its handler." },
    { front: "What is pushed onto the kernel stack when an exception occurs?", back: "The return address and the interrupted process's state. The kernel stack is used instead of the user stack for security and isolation." },
    { front: "What are the IA-32 exception number ranges?", back: "0-31: processor-defined (0=divide by zero, 13=segfault, 14=page fault). 32-255: OS-defined (128/0x80=system call trap)." },
    { front: "How are system calls made on IA-32 Linux?", back: "Put the service number in %eax, arguments in other registers, then execute int $0x80. Service numbers: 1=exit, 2=fork, 3=read, 4=write, 11=execve." },
    { front: "What are the three possible outcomes after an exception handler?", back: "Return to the current instruction and re-execute (page fault). Return to the next instruction (trap). Do not return at all (abort)." },
    { front: "How do user mode and kernel mode differ?", back: "User mode: restricted instructions and limited memory access. Kernel mode: full hardware access. Only exceptions switch from user to kernel; handlers switch back on return." },
    { front: "Why is polling inferior to interrupts?", back: "Polling wastes CPU cycles checking for events continuously. Interrupts let hardware signal the CPU only when something actually needs attention." }
    ],
  },
  {
    id: "signals",
    label: "Unix Signals",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What is a Unix signal?", back: "A small message (positive integer ID) sent to a process by the kernel. Used for hardware exception notifications, kernel events, and inter-process communication. Linux has 30 standard types." },
    { front: "What are the three phases of signaling?", back: "Sending: kernel records the signal for the destination. Delivering: stored in the process's pending bit vector. Receiving: kernel causes the process to react when control returns to it." },
    { front: "What does blocking a signal mean?", back: "Preventing it from being received. Each process has a blocked bit vector. Blocked signals stay pending until unblocked." },
    { front: "What are the five default signal actions?", back: "Terminate (SIGINT), terminate and dump core (SIGSEGV), stop/suspend (SIGTSTP), continue if stopped (SIGCONT), ignore (SIGWINCH)." },
    { front: "How do you send signals programmatically?", back: "kill(pid, sig): send to a process. killpg(pgrp, sig): send to a process group. alarm(seconds): schedule SIGALRM. Requires signal.h." },
    { front: "What is a signal handler?", back: "A programmer-defined function the kernel calls when a signal is received. Registered with signal(). Should not call unsafe functions like printf() since it may interrupt them mid-execution." },
    { front: "Give three examples of signals triggered by hardware events.", back: "Divide by zero triggers SIGFPE (8). Illegal memory access triggers SIGSEGV (11). Ctrl-C triggers SIGINT (2)." }
    ],
  },
  {
    id: "object-files",
    label: "Object Files (ROF, EOF, SOF)",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What are the three types of object files?", back: "ROF (relocatable): produced by assembler, input to linker. EOF (executable): produced by linker, loaded by OS to run. SOF (shared): dynamically linked at load or run time." },
    { front: "What is ELF?", back: "Executable and Linkable Format: Linux's standard object file format. Used for ROFs, EOFs, and SOFs alike." },
    { front: "Why compile files separately?", back: "Only changed files need recompiling. Large programs can be split into independently developed units each with its own header and source file." },
    { front: "What is a Makefile?", back: "A text file with rules for building files, used with make. Each rule has a target, dependencies, and tab-indented commands. make rebuilds only what is out of date based on file timestamps." },
    { front: "What are linker symbols?", back: "Identifiers for variables and functions that the linker tracks. Generated by the compiler for global variables, static locals, and all functions. Stack locals and parameters do not need them." },
    { front: "Which variables need linker symbols?", back: "Need symbols: global variables, static locals, extern variables, all functions. Do not need symbols: local variables and parameters (they live on the stack)." },
    { front: "What is the linker symbol table?", back: "An array of Elf_Symbol structures built by the assembler. Stores the name, address, size, type, and visibility for each linker symbol." }
    ],
  },
  {
    id: "linking",
    label: "Linking: Symbols, Resolution, Relocation",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What is a forward declaration?", back: "Tells the compiler about an identifier's name and type before its full definition. Required because C must see declarations before uses, and enables separate compilation and mutual recursion." },
    { front: "What is the difference between declaring and defining?", back: "Declaring: tells the compiler the name and type. Defining: allocates memory (variable) or provides the body (function). A variable with extern is declared only, not defined." },
    { front: "What is the One Definition Rule (ODR)?", back: "Each identifier can be defined exactly once in its scope. Globals must have one definition across all object files. Violations produce linker errors." },
    { front: "What are the two main tasks of static linking?", back: "Symbol resolution: verify each symbol has exactly one definition. Relocation: assign virtual addresses and patch all symbol references with final addresses." },
    { front: "How is resolution split between compiler and linker?", back: "Compiler resolves local symbols within one file. Linker resolves globals across all object files and enforces ODR." },
    { front: "What does the static keyword do to a global variable or function?", back: "Makes it private to the source file. Other files cannot access it even with extern. Without static, any translation unit can access it by declaring it extern." },
    { front: "What does extern do?", back: "Declares that a variable or function is defined in another file. No memory is allocated. The linker resolves it to the actual definition." },
    { front: "What is symbol relocation?", back: "Merging same-type sections from multiple ROFs, assigning virtual addresses to each symbol, and patching all references in .rel.text and .rel.data." },
    { front: "What is the difference between static and dynamic linking?", back: "Static: library code copied into the binary at build time (larger, self-contained). Dynamic: library loaded at runtime from a shared object file (smaller binary, shared across processes)." },
    { front: "What happens if a global symbol is undefined or multiply defined?", back: "Linker error: undefined reference if missing, multiple definition error if duplicated." }
    ],
  },
  {
    id: "build-process",
    label: "C Build Process (Preprocess→Link)",
    group: "systems-prog",
    groupLabel: "Systems Programming",
    courses: ["CS 354"],
    cards: [
    { front: "What are the four phases of the C build process?", back: "Preprocessing, compiling (to assembly), assembling (to machine code), linking." },
    { front: "What does the preprocessing phase do?", back: "Expands #include and #define directives, merging header file contents into the source. Output: .i file. Flag: -E." },
    { front: "What does the compiling phase do?", back: "Translates preprocessed C to assembly for the target processor. Output: .s file. Flag: -S." },
    { front: "What does the assembling phase do?", back: "Converts assembly to machine code (object code). Output: .o relocatable object file. Flag: -c. Inspect with objdump -d." },
    { front: "What does the linking phase do?", back: "Combines object files and library code into a runnable executable. Resolves symbols and relocates addresses. Flag: -o to name the output." },
    { front: "What do the common gcc flags mean?", back: "-Wall: all warnings. -m32: 32-bit code. -std=gnu99: GNU C99. -g: debug info for gdb. -o name: output filename." },
    { front: "What is the role of header vs. source files in a multifile program?", back: "Header (.h): public interface, contains declarations to share. Source (.c): private implementation, contains definitions." },
    { front: "What does the OS loader do when you run an executable?", back: "It reads the EOF, creates the runtime memory image (code and data segments, empty heap and stack), maps the segments into the page table, then jumps to the entry point." }
    ],
  },
  {
    id: "vas",
    label: "Virtual Address Space Layout",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 354", "CS 537"],
    cards: [
    { front: "What is a Virtual Address Space (VAS)?", back: "An illusion created by the OS that each process has its own contiguous private memory. In reality, physical memory is shared. On IA-32, the VAS is 2^32 bytes (4 GiB)." },
    { front: "What are the three faces of memory?", back: "Process view: each process sees a simple private virtual address space. System view: the OS manages pages and page tables to share and protect real memory. Hardware view: a multi-level hierarchy of physical memory." },
    { front: "List the VAS segments from low address to high.", back: "Code (.text, .rodata) then Data (.data, .bss) then Heap (grows up) then Memory-mapped region then Stack (grows down) then Kernel (top, reserved for OS)." },
    { front: "What is stored in the Code segment?", back: ".text: binary machine code instructions. .rodata: string literals and constants. Lifetime is the full program execution. Access is read-only." },
    { front: "What is stored in the Data segment?", back: "Global and static local variables. .data: initialized with nonzero values. .bss: uninitialized or zero-initialized. Loaded before program starts. Read/write access." },
    { front: "How does the Heap segment work?", back: "Stores memory allocated with malloc at runtime. Grows upward. The OS tracks the top with the brk pointer. No default initialization. Read/write access." },
    { front: "How does the Stack segment work?", back: "Contains stack frames with parameters, local variables, and temporaries. Grows downward. Lifetime is from declaration to end of scope. No default initialization." },
    { front: "What is variable shadowing?", back: "When a local variable shares a name with a global, the local takes precedence inside its scope. The global is inaccessible from that function." },
    { front: "What is the Memory-Mapped region used for?", back: "Shared memory between processes, dynamically linked libraries, and memory-mapped file I/O. Virtual pages here can be shared across processes." }
    ],
  },
  {
    id: "heap-management",
    label: "Heap Allocation &amp; Free Lists",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 354"],
    cards: [
    { front: "What is the heap in terms of memory management?", back: "A segment of the VAS for dynamically allocated memory. Managed as a collection of variable-sized blocks, each with a payload (usable data) and overhead (allocator metadata)." },
    { front: "What are the four heap allocator functions in stdlib.h?", back: "malloc(n): allocate n bytes. calloc(count, size): allocate and zero-initialize. realloc(ptr, n): resize an existing block. free(ptr): release a block. All return NULL on failure." },
    { front: "What is the difference between implicit and explicit allocators?", back: "Implicit (Java): runtime automatically manages allocation and garbage collection. Explicit (C): programmer calls malloc and free manually with exact sizes." },
    { front: "What are the two goals of allocator design?", back: "Maximize throughput (requests handled per second) and maximize memory utilization (payload bytes vs. total heap). These goals trade off against each other." },
    { front: "What are the heap alignment requirements on IA-32?", back: "Block size must be a multiple of 8. Payload address must be a multiple of 8. The first 4 bytes of the heap are unused padding to satisfy the payload alignment." },
    { front: "What are external and internal fragmentation?", back: "External: total free space is sufficient but no single block is large enough. Internal: wasted space inside an allocated block due to padding or rounding." },
    { front: "How does an implicit free list encode block metadata?", back: "Each block's first word (4 bytes) is a header encoding size and status as one integer. Since size is a multiple of 8, the low 3 bits are always 0, so the LSB serves as the alloc bit (1=allocated, 0=free)." },
    { front: "How do you traverse an implicit free list?", back: "Start at the first block. Next block address = current address + size from header. Repeat until the end mark (size 0, alloc bit 1)." },
    { front: "What do brk and sbrk do?", back: "brk(addr): sets the top of the heap to a specific address. sbrk(incr): grows (positive) or shrinks (negative) the heap by incr bytes. Prefer malloc/free in normal code." },
    { front: "What is errno?", back: "A global variable set by OS and library functions to report the specific error that occurred. Use strerror(errno) from errno.h to get a readable message." }
    ],
  },
  {
    id: "placement-policies",
    label: "Placement Policies (First/Next/Best Fit)",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 354"],
    cards: [
    { front: "What is the First Fit placement policy?", back: "Search from the beginning of the heap and stop at the first free block that is large enough. Good memory utilization, but slow for large requests because small blocks must be skipped." },
    { front: "What is the Next Fit placement policy?", back: "Search from the most recently allocated block, wrapping around if needed. Faster than First Fit on average, but worse memory utilization since it may land on oversized blocks." },
    { front: "What is the Best Fit placement policy?", back: "Search the entire heap for the free block closest in size to the request. Best memory utilization, but slowest throughput since it must scan all blocks in the worst case." }
    ],
  },
  {
    id: "coalescing",
    label: "Block Splitting &amp; Coalescing",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 354"],
    cards: [
    { front: "What is false fragmentation?", back: "Enough contiguous free space exists to satisfy a request, but it is split into smaller adjacent free blocks that individually are too small." },
    { front: "What is coalescing and what are the two strategies?", back: "Merging adjacent free blocks into one larger block. Immediate: merge on every free(). Delayed: merge only when a malloc cannot find a large enough block." },
    { front: "What is block splitting?", back: "When a chosen free block is larger than needed, divide it into one allocated block of the requested size and one smaller free block. Reduces internal fragmentation." },
    { front: "Why are footers needed for coalescing?", back: "To coalesce backward, you need the previous block's size to find its header. A footer is the last word of each free block, storing that size so it can be read at a known offset." },
    { front: "What is the p-bit?", back: "A bit in a block's header indicating whether the previous block is allocated (p=1) or free (p=0). Free blocks need footers; allocated blocks do not. The p-bit tells whether a footer exists." },
    { front: "What are the options when no free block is large enough?", back: "Coalesce adjacent free blocks. Ask the OS for more heap space via sbrk. Return NULL if neither works. Allocated blocks cannot be moved." }
    ],
  },
  {
    id: "explicit-free-list",
    label: "Explicit &amp; Segregated Free Lists",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 354"],
    cards: [
    { front: "How does an explicit free list improve over implicit?", back: "Keeps a linked list of only free blocks using pred/succ pointers stored inside each free block. malloc traverses only free blocks, not all blocks. Minimum block size is 16 bytes (header + pred + succ + footer)." },
    { front: "What are the two ordering strategies for an explicit free list?", back: "Address order: sorted ascending by address, good utilization, but free() is slow (must find insertion point). Last-in order: newest freed block at front, constant-time free() but may choose oversized blocks." },
    { front: "What is simple segregated storage?", back: "An array of free lists, one per block size. No splitting or coalescing. Fast constant-time malloc (grab from front of correct list) and free (prepend). If a list is empty, request more heap from the OS." },
    { front: "What is fitted segregated storage?", back: "An array of free lists by size range. Supports splitting and coalescing. First-fit search within the right list. Utilization comparable to best-fit with better throughput than searching the whole heap." }
    ],
  },
  {
    id: "memory-hierarchy",
    label: "Memory Hierarchy (L0–Storage)",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 354", "CS 537"],
    cards: [
    { front: "What is the memory hierarchy from fastest to slowest?", back: "CPU registers (L0) → L1 cache → L2 cache → L3 cache → Main memory (RAM) → Storage (SSD/HDD) → Network. Each level is larger, slower, and cheaper per byte." },
    { front: "What are the typical sizes for each cache level on IA-32?", back: "L0: 8 × 32-bit registers. L1: ~32 KiB. L2: ~256 KiB. L3: ~8 MiB (shared across cores). Main memory: 8–64 GiB. Each core typically has its own L1 and L2." },
    { front: "What are the data transfer units at each level?", back: "Word (4 bytes): between CPU registers and L1 cache. Block/cache line (32–64 bytes): between cache levels and main memory. Page (4 KiB): between main memory and storage." },
    { front: "What is the purpose of caching?", back: "A cache is smaller, faster memory that acts as a staging area for data from larger, slower memory. It exploits locality to give the illusion of having lots of fast memory." },
    { front: "How is memory access time measured?", back: "CPU cycles measure time. Latency measures the delay to access a specific memory location. Higher levels in the hierarchy have lower latency but less capacity." }
    ],
  },
  {
    id: "locality",
    label: "Spatial &amp; Temporal Locality",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 354", "CS 537", "CS 564"],
    cards: [
    { front: "What is temporal locality?", back: "The tendency to access the same memory location repeatedly in the near future. Exploited by caching: recently accessed data is kept at higher (faster) levels." },
    { front: "What is spatial locality?", back: "The tendency to access memory locations near recently accessed ones. Exploited by transferring blocks of contiguous data into cache — nearby data comes along for free." },
    { front: "What is stride and how does it affect locality?", back: "The step size (in elements) between sequential accesses. Stride-1 has excellent spatial locality (every element accessed). Larger strides skip cached data, reducing spatial locality benefits." },
    { front: "How do you improve locality for nested loops over a 2D array?", back: "The biggest jump should be in the outer loop. For row-major arrays (C default), iterate over columns in the inner loop — this accesses contiguous memory, minimizing stride." },
    { front: "How does locality inform caching decisions?", back: "Temporal locality → anticipate data reuse, so copy it to cache. Spatial locality → anticipate nearby data use, so copy an entire block (not just the requested byte) to cache." }
    ],
  },
  {
    id: "cache-design",
    label: "Cache Design (Sets, Lines, Tags)",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 354"],
    cards: [
    { front: "How are memory address bits divided for cache access?", back: "From LSB: b bits (block offset, which byte in the block), s bits (set index, which cache set), remaining t bits (tag, identifies which block is stored). b = log2(block size), s = log2(number of sets)." },
    { front: "Why are b-bits and s-bits taken from the least significant positions?", back: "Consecutive addresses map to the same block (good spatial locality) and consecutive blocks map to sequential sets (avoids clustering conflict misses)." },
    { front: "What is a cache line and what does it contain?", back: "A storage location in cache holding one block of data plus metadata: tag bits (which memory block is stored) and a valid bit (1=valid, 0=empty/invalid)." },
    { front: "What are the three steps of a cache lookup?", back: "Set selection: extract s-bits to find the set. Line matching: compare tag bits and check valid bit. Data extraction: on hit, use word offset and byte offset to return the data." },
    { front: "What happens on a cache miss?", back: "The block is fetched from the next lower level. A line in the set is evicted if full. The new block's data and tag are stored and the valid bit is set to 1." },
    { front: "How is cache size calculated?", back: "Capacity = S * E * B, where S is sets, E is lines per set (associativity), B is block size in bytes." },
    { front: "What are the three types of cache misses?", back: "Cold (compulsory): first access to a block, cache is empty. Capacity: working set exceeds cache size. Conflict: two blocks compete for the same set, evicting each other." }
    ],
  },
  {
    id: "cache-types",
    label: "Direct-Mapped, Set-Associative, Fully-Associative",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 354"],
    cards: [
    { front: "What is a direct-mapped cache?", back: "Each set has exactly one line (E=1). Every memory block maps to exactly one location. Fast and simple circuitry, but vulnerable to conflict misses (thrashing). Good for L3." },
    { front: "What is a fully associative cache?", back: "One set containing all E lines. Any block can go anywhere. No s-bits, only tag and offset. Eliminates conflict misses but requires comparing tags across all lines. Good for L1 and TLBs." },
    { front: "What is a set-associative cache?", back: "S sets with E lines per set. Blocks map to one set but can occupy any line within it. Balances conflict miss reduction with manageable hardware complexity. Line matching is O(E)." },
    { front: "What is thrashing in caching?", back: "Multiple frequently-used blocks map to the same set and keep evicting each other, causing every access to miss. Increasing associativity (E) reduces thrashing." },
    { front: "What replacement policies are used when a set is full?", back: "Random: simple, no tracking needed. LRU: evict the least recently used line, good for temporal locality. LFU: evict the least frequently used line, uses a counter per line." }
    ],
  },
  {
    id: "cache-writes",
    label: "Write Policies (Write-Through, Write-Back)",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 354"],
    cards: [
    { front: "What is a write hit and what are the two policies?", back: "Writing to a block already in cache. Write-through: immediately update the next lower level (slow, more bus traffic, but lower level stays consistent). Write-back: update only this cache; write to lower level on eviction (fast, uses dirty bit to track modifications)." },
    { front: "What is a write miss and what are the two policies?", back: "Writing to a block NOT in cache. No-write-allocate: write directly to the next lower level, bypassing this cache. Write-allocate: read the block into cache first, then write to it (more bus traffic now, but future writes hit in cache)." },
    { front: "How are write policies paired in practice?", back: "Write-through pairs with no-write-allocate (lower level stays consistent). Write-back pairs with write-allocate (this level stays consistent, more symmetric with reads, better for locality). The write-back + write-allocate pairing is preferred." },
    { front: "What is a dirty bit in the context of caching?", back: "A flag per cache line indicating whether the data has been modified since it was loaded. Used by write-back caches — on eviction, a dirty line must be written to the lower level; a clean line can simply be discarded." }
    ],
  },
  {
    id: "cache-performance",
    label: "Cache Performance &amp; Memory Mountain",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 354"],
    cards: [
    { front: "What are hit rate, hit time, and miss penalty?", back: "Hit rate: hits / total accesses. Hit time: time to determine a hit (depends on set selection + line matching speed). Miss penalty: additional time to handle a miss (fetch block from lower level — depends on block size and memory speed)." },
    { front: "How does increasing block size (B) affect cache performance?", back: "Hit rate improves (better spatial locality). Hit time unchanged. Miss penalty worsens (larger blocks take longer to transfer)." },
    { front: "How does increasing the number of sets (S) affect cache performance?", back: "Hit rate improves (better temporal locality — more distinct sets). Hit time worsens (potentially more address bits to decode). Miss penalty unchanged." },
    { front: "How does increasing associativity (E) affect cache performance?", back: "Hit rate improves (fewer conflict misses). Hit time worsens (more lines to compare tags against). Miss penalty worsens (more lines to check before declaring a miss)." },
    { front: "What is the memory mountain?", back: "A 3D plot of read throughput vs. array size (Y) and stride (X). Peak throughput: small array fits in L1, stride = 1. Throughput drops as array exceeds cache sizes (temporal locality) and stride increases (spatial locality)." },
    { front: "What is the formula for stride-based miss rate?", back: "Miss rate ≈ min(1, word_size × stride / block_size) × 100%. When stride × word_size exceeds block size, every access is a miss (0% hit rate)." }
    ],
  },
  {
    id: "page-table",
    label: "Page Tables &amp; Address Translation",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 537"],
    cards: [
    { front: "What is a page table?", back: "A per-process data structure maintained by the OS that maps Virtual Page Numbers (VPN) to Physical Frame Numbers (PFN). Enables the hardware to translate every virtual address to a physical address." },
    { front: "What is the difference between a page and a frame?", back: "A page is a fixed-size unit of virtual address space. A frame is a fixed-size unit of physical memory. They are the same size (typically 4 KB). The page table maps pages to frames." },
    { front: "How is a virtual address split for paging?", back: "Upper bits = Virtual Page Number (VPN), used as an index into the page table. Lower bits = page offset (which byte within the page). For 4 KB pages, the offset is 12 bits." },
    { front: "What fields does a Page Table Entry (PTE) contain?", back: "Physical Frame Number (PFN), present bit (in RAM or on disk), dirty bit (modified since loaded), protection bits (read/write/execute permissions), referenced/use bit (accessed recently)." },
    { front: "Why does paging eliminate external fragmentation?", back: "All pages and frames are the same fixed size. Any free frame can hold any page — no need for contiguous allocation. The trade-off is internal fragmentation (the last page of a process may not be full)." },
    { front: "Why does paging double the number of memory references?", back: "Every data access requires two memory reads: first the PTE from the page table (to get the PFN), then the actual data at the physical address. The TLB solves this by caching translations." },
    { front: "Who builds the page table and who walks it?", back: "The OS builds and maintains page tables (allocating frames, setting permissions, handling page faults). On x86, the hardware (MMU) walks the page table on TLB misses. On some architectures, the OS walks it (software-managed TLB)." }
    ],
  },
  {
    id: "tlb",
    label: "Translation Lookaside Buffer (TLB)",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 537"],
    cards: [
    { front: "What is a TLB?", back: "Translation Lookaside Buffer — a small, fast hardware cache inside the MMU that stores recent VPN → PFN mappings. On a hit, the physical address is formed instantly without accessing the page table in memory." },
    { front: "What happens on a TLB miss?", back: "The hardware (or OS) must perform a page table walk — reading PTEs from memory at each level. This is much slower than a TLB hit. The resulting translation is then cached in the TLB for future use." },
    { front: "Why must the TLB be managed during context switches?", back: "Different processes have different page tables. Stale TLB entries from the old process would map to wrong physical frames for the new process, causing data corruption or protection violations." },
    { front: "What are the two strategies for handling TLB entries across context switches?", back: "Flush the entire TLB (simple but expensive — new process gets compulsory misses on its whole working set). Use ASIDs (Address Space Identifiers) to tag entries by process, allowing multiple processes' translations to coexist." },
    { front: "What is TLB reach?", back: "The total amount of memory accessible without a TLB miss = number of TLB entries × page size. Increasing page size (e.g., 2 MB huge pages) dramatically increases reach." },
    { front: "How does spatial locality benefit TLB performance?", back: "Accessing nearby addresses on the same page reuses the same cached TLB entry — one translation covers the entire page (e.g., 4 KB), so sequential array access incurs very few TLB misses." },
    { front: "How does temporal locality benefit TLB performance?", back: "Repeatedly accessing the same memory address (e.g., a loop variable) keeps its translation in the TLB, avoiding repeated page table walks." },
    { front: "What is the CR3 register on x86?", back: "The Page Table Base Register — it stores the physical address of the current process's top-level page table (page directory). Updated on every context switch." }
    ],
  },
  {
    id: "multi-level-pt",
    label: "Multi-Level Page Tables",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 537"],
    cards: [
    { front: "What problem do multi-level page tables solve?", back: "A flat (linear) page table for a 32-bit address space with 4 KB pages requires 4 MiB of contiguous memory per process — wasteful for sparse address spaces where most virtual pages are unused." },
    { front: "How does a 2-level page table work?", back: "The VPN is split into a Page Directory Index (PDX) and a Page Table Index (PTX). PDX indexes into the page directory to find the second-level page table, then PTX indexes into that table to find the PFN." },
    { front: "How do multi-level page tables save memory?", back: "Second-level page tables are only allocated for virtual address ranges actually in use. For sparse address spaces, most page directory entries are marked invalid, and no second-level tables are created for those ranges." },
    { front: "When do multi-level page tables use MORE memory than linear?", back: "When the address space is fully occupied — every second-level table exists, plus the overhead of the page directory itself. But this case is rare for real processes." },
    { front: "What happens if a page directory entry is marked invalid?", back: "The hardware/OS knows that entire range of virtual memory (e.g., 4 MB on x86) is unmapped. No further table walking is needed — saves both memory and lookup time." },
    { front: "How many levels does x86-64 use for a 48-bit virtual address?", back: "Four levels: PML4 → PDPT → PD → PT → physical frame. Each level has 512 entries (9 bits per level index), with 12 bits for the page offset. 9+9+9+9+12 = 48 bits." },
    { front: "What is the trade-off of multi-level page tables for TLB misses?", back: "Each additional level adds one more memory reference to the page table walk on a TLB miss. A 4-level walk requires 4 memory reads before accessing the actual data." }
    ],
  },
  {
    id: "page-replacement",
    label: "Page Replacement (FIFO, LRU, Clock)",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 537"],
    cards: [
    { front: "When does the OS need a page replacement policy?", back: "When a page fault occurs and physical memory is full — the OS must choose a 'victim' page to evict to make room for the new page being loaded from disk." },
    { front: "Why is OPT (Optimal) page replacement impossible to implement?", back: "It evicts the page that won't be used for the longest time in the future — which requires perfect knowledge of future memory accesses. Used only as a theoretical benchmark." },
    { front: "What is FIFO page replacement and what is its weakness?", back: "Evict the page that entered memory first. Simple but may evict heavily-used pages just because they arrived early. Suffers from Belady's Anomaly." },
    { front: "What is Belady's Anomaly?", back: "The counterintuitive phenomenon where increasing the number of physical frames causes MORE page faults under FIFO. It occurs because FIFO lacks the 'stack property' — the set of pages in N frames is not always a subset of the set in N+1 frames." },
    { front: "What is the LRU page replacement policy?", back: "Evict the page not accessed for the longest time — based on the principle that recently used pages are likely to be used again. Doesn't suffer from Belady's Anomaly (has the stack property). But perfect LRU is too expensive to implement (requires updating an ordered list on every access)." },
    { front: "How does the Clock algorithm approximate LRU?", back: "A circular list of pages with a use/reference bit. The 'clock hand' scans: if use bit = 1, clear it to 0 and advance (second chance). If use bit = 0, evict that page. Hardware sets the use bit to 1 on each access." },
    { front: "Why is it more efficient to replace a clean page than a dirty page?", back: "A clean page (dirty bit = 0) hasn't been modified since loading — it can be discarded immediately. A dirty page must be written back to disk first (a slow I/O operation)." },
    { front: "What is the difference between global and local replacement?", back: "Global: any process's pages can be evicted for any other process. More flexible but one memory-intensive process can ruin others' performance. Local: each process evicts only from its own allocated frames. More predictable but less adaptive." },
    { front: "What is the stack property and why does it matter?", back: "A replacement algorithm has the stack property if the set of pages in a cache of size N is always a subset of pages in a cache of size N+1. LRU and OPT have it (no Belady's Anomaly). FIFO doesn't." }
    ],
  },
  {
    id: "demand-paging",
    label: "Demand Paging &amp; Page Faults",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 537"],
    cards: [
    { front: "What is demand paging?", back: "A lazy policy where pages are loaded into physical memory only when a page fault occurs — the page is accessed but its present bit is 0. Avoids loading pages that are never used." },
    { front: "What is a page fault?", back: "A hardware trap triggered when a process accesses a virtual page whose present bit is 0 in the PTE. The OS handler finds the page on disk, loads it into a free frame, updates the PTE, and restarts the faulting instruction." },
    { front: "What is the difference between a hard and soft page fault?", back: "Hard: the page must be read from disk (very slow). Soft: the page is still in memory (e.g., in an inactive list) but its present bit was cleared — just update the PTE (much faster)." },
    { front: "What is the disadvantage of demand paging during process startup?", back: "The process incurs many compulsory page faults as it touches pages for the first time, since nothing is pre-loaded. This creates an initial burst of slow disk I/O." },
    { front: "What is prepaging (prefetching)?", back: "The OS predicts which pages will be needed soon and loads them before they're accessed, avoiding future page faults. Effective for sequential access patterns. Wastes memory and I/O if predictions are wrong." },
    { front: "What is mmap (memory-mapped file I/O)?", back: "Maps a file's contents directly into a process's virtual address space. File data is accessed via pointers instead of read/write system calls. Multiple processes can map the same file for shared memory." },
    { front: "What is a swap daemon?", back: "A background kernel process that monitors free memory and proactively evicts pages to the swap space before memory is exhausted. Keeps a reserve of free frames ready for future page faults." }
    ],
  },
  {
    id: "thrashing",
    label: "Thrashing &amp; Working Sets",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 537"],
    cards: [
    { front: "What is thrashing?", back: "When the combined working sets of all active processes exceed physical memory. The system spends most of its time swapping pages to and from disk, and CPU utilization plummets because processes are constantly stalled on I/O." },
    { front: "What is the working set of a process?", back: "The set of pages actively referenced within a recent time window (Δ). It represents the process's current locality — the minimum set of pages it needs in memory to make progress without excessive faulting." },
    { front: "How does the OS respond to thrashing?", back: "It may suspend some processes to reduce the total working set demand, allowing remaining processes to fit their localities in memory. The suspended processes are swapped out entirely." },
    { front: "What does a quickly moving clock hand indicate?", back: "High memory pressure — pages are being evicted rapidly, which means the system is close to thrashing. Most pages are being frequently accessed, leaving few candidates for eviction." },
    { front: "Why is thrashing especially dangerous for throughput?", back: "The CPU goes idle waiting for disk I/O. The OS may misinterpret low CPU utilization as a signal to admit more processes, which increases memory pressure further — a vicious cycle." }
    ],
  },
  {
    id: "cow",
    label: "Copy-on-Write",
    group: "memory",
    groupLabel: "Memory Systems",
    courses: ["CS 537"],
    cards: [
    { front: "What is Copy-on-Write (COW)?", back: "An optimization where after fork(), parent and child share the same physical pages, all marked read-only. A private copy is created only when either process writes to a page — triggered by the resulting write fault." },
    { front: "Why does COW improve fork() performance?", back: "It avoids copying the entire address space immediately. If the child calls exec() shortly after (the common case), the old pages are never written and never need to be copied at all." },
    { front: "How does the OS handle a write to a COW page?", back: "The write triggers a protection fault (page is marked read-only). The OS allocates a new physical frame, copies the original page's contents, updates the faulting process's PTE to point to the new frame, and marks it writable. The other process keeps the original." }
    ],
  },
  {
    id: "process",
    label: "Processes &amp; PCB",
    group: "os",
    groupLabel: "Operating Systems",
    courses: ["CS 537", "CS 354"],
    cards: [
    { front: "What is a process and how does it differ from a program?", back: "A process is a running instance of a program — it has its own execution stream, registers, address space, and open files. A program is static code and data on disk; a process is that code in active execution." },
    { front: "What are the three components of a process's state?", back: "Registers (including PC and SP), address space (code, data, heap, stack), and open files/I/O state." },
    { front: "What are the three states in the process state machine?", back: "Running (actively executing on CPU), Ready (waiting for CPU — could run but isn't scheduled), Blocked (waiting for I/O or synchronization to complete)." },
    { front: "What triggers each state transition?", back: "Running → Ready: timer interrupt / preemption. Running → Blocked: process initiates I/O or wait(). Blocked → Ready: I/O completes or event occurs. Ready → Running: scheduler dispatches it." },
    { front: "What is a Process Control Block (PCB)?", back: "An OS data structure storing everything needed to resume a process: saved registers (PC, SP, general-purpose), PID, process state, scheduling priority, page table pointer, open file list, and parent/child relationships." },
    { front: "What is the Ready Queue?", back: "A data structure containing all processes in the Ready state — waiting for an available CPU. The scheduler selects from this queue to determine which process runs next." },
    { front: "What three illusions does the OS create for each process?", back: "CPU: each process believes it has exclusive, continuous use of the processor (logical control flow). Memory: each process sees its own private contiguous address space (VAS). Devices: I/O appears as simple operations (interrupts/signals hidden)." }
    ],
  },
  {
    id: "threads",
    label: "Threads &amp; Thread Control Block",
    group: "os",
    groupLabel: "Operating Systems",
    courses: ["CS 537"],
    cards: [
    { front: "What is the fundamental difference between a process and a thread regarding memory?", back: "Threads of the same process share a single address space (same page table, heap, code, data). Each thread has its own registers (including PC) and its own stack. Processes have entirely separate address spaces." },
    { front: "What is a Thread Control Block (TCB)?", back: "A data structure storing a thread's private state during a context switch: its register values (including PC) and stack pointer. Much smaller than a PCB since it doesn't include address space or file info." },
    { front: "Why is creating a thread cheaper than creating a process?", back: "No need to create a new address space, page table, or copy memory. The thread just needs a new stack and TCB. It shares everything else with the parent thread's process." },
    { front: "Why does concurrency with threads lead to non-deterministic results?", back: "The outcome depends on the specific order in which the OS scheduler interleaves thread instructions. Different runs can produce different interleavings, making bugs intermittent and hard to reproduce." }
    ],
  },
  {
    id: "context-switch",
    label: "Context Switching",
    group: "os",
    groupLabel: "Operating Systems",
    courses: ["CS 537", "CS 354"],
    cards: [
    { front: "What are the three steps of a context switch?", back: "1) SAVE the context (registers, stack pointers) of the current process to its PCB. 2) RESTORE the context of the next process from its PCB. 3) TRANSFER control to the restored process by loading its PC." },
    { front: "What context must be preserved during a context switch?", back: "CPU registers (including PC), user stack (%ebp, %esp), kernel stack pointers, and kernel data structures (page table pointer, process table entry, file table)." },
    { front: "Why are context switches expensive?", back: "Direct cost: time to save/restore register state. Indirect cost: cache pollution — the new process's working set evicts the old process's cached data, causing cold misses until the cache warms up." },
    { front: "When do context switches occur?", back: "As a result of an exception: timer interrupt (scheduler runs and may swap processes), I/O completion interrupt, system call that blocks, or voluntary yield()." },
    { front: "Why does the kernel need its own stack for each process?", back: "To safely store process state during interrupts and system calls without corrupting the user-level stack. Each process has both a user stack and a kernel stack." }
    ],
  },
  {
    id: "system-calls",
    label: "System Calls &amp; Traps",
    group: "os",
    groupLabel: "Operating Systems",
    courses: ["CS 537", "CS 354", "ECE 252"],
    cards: [
    { front: "What is a system call?", back: "A controlled procedure call that allows a user-mode process to request a service from the OS kernel. It simultaneously raises the privilege level and jumps into kernel code." },
    { front: "What is Limited Direct Execution (LDE)?", back: "The approach where user processes run directly on the hardware (for performance) while the OS and hardware maintain control at key points — system calls, interrupts, and timer-based preemption." },
    { front: "What is a trap table?", back: "A hardware-managed jump table initialized by the OS at boot time. Maps exception/interrupt numbers to handler addresses. When a trap occurs, the hardware uses this table to find and execute the correct handler." },
    { front: "Why must the OS use 'return-from-trap' instead of a regular return?", back: "It must simultaneously lower the CPU privilege level back to user mode and restore the user process's program counter — a regular return doesn't change privilege." },
    { front: "What is cooperative vs. preemptive multitasking?", back: "Cooperative: OS trusts processes to voluntarily yield via system calls. Risk: a buggy/malicious process can monopolize the CPU. Preemptive: hardware timer interrupts force the OS to regain control periodically (e.g., every 10ms), guaranteeing fairness." },
    { front: "What hardware mechanism enables preemptive multitasking?", back: "The timer interrupt — a hardware-generated signal at fixed intervals that the user process cannot mask or disable. It forces a trap into the kernel, where the scheduler can switch processes." }
    ],
  },
  {
    id: "user-kernel-mode",
    label: "User/Kernel Mode",
    group: "os",
    groupLabel: "Operating Systems",
    courses: ["CS 537", "CS 354"],
    cards: [
    { front: "What is the difference between user mode and kernel mode?", back: "User mode: restricted — cannot execute privileged instructions, access hardware directly, or touch memory outside its address space. Kernel mode: unrestricted — full access to all hardware, memory, and instructions. A mode bit in the CPU indicates current mode." },
    { front: "How does the CPU transition between modes?", back: "User → Kernel: only via an exception (trap, interrupt, fault). Kernel → User: via return-from-trap instruction. User code cannot set the mode bit directly." },
    { front: "Why is direct execution of user programs on hardware dangerous without protection?", back: "A process could execute privileged instructions (like disabling interrupts), access other processes' memory, or run forever without the OS being able to regain control." }
    ],
  },
  {
    id: "scheduling",
    label: "CPU Scheduling (FIFO, SJF, STCF, RR)",
    group: "os",
    groupLabel: "Operating Systems",
    courses: ["CS 537"],
    cards: [
    { front: "What is turnaround time?", back: "Completion time minus arrival time — the total time a job spends in the system from arrival to finish." },
    { front: "What is response time?", back: "Time of first execution minus arrival time — how long until a job starts running for the first time." },
    { front: "What is throughput?", back: "The number of jobs completed per unit of time. A system-level metric rather than a per-job metric." },
    { front: "How does FIFO scheduling work and what is its weakness?", back: "Runs jobs in arrival order. Simple but suffers from the Convoy Effect: several short jobs stuck behind one long job experience inflated turnaround times." },
    { front: "When is FIFO actually optimal?", back: "When all jobs have exactly the same runtime — there's no ordering that can improve average turnaround time." },
    { front: "How does SJF (Shortest Job First) work and why isn't it always optimal?", back: "Runs the job with the shortest total runtime next. Optimal for turnaround time when all jobs arrive simultaneously. But it's non-preemptive — if a short job arrives after a long job starts, it must wait." },
    { front: "How does STCF (Shortest Time-to-Completion First) improve on SJF?", back: "It's preemptive — whenever a new job arrives, it compares remaining times and runs whichever has the least time left. Optimal for turnaround time even with staggered arrivals. Requires knowing (or estimating) runtimes." },
    { front: "How does Round Robin work and what is its fundamental trade-off?", back: "Runs each job for a fixed time slice, then switches to the next in the queue. Excellent response time (all jobs make progress). Poor turnaround time (stretches out every job). Shorter slices → better response but more context switch overhead." },
    { front: "What are the goals of interactive vs. batch programs?", back: "Interactive: minimize response time (user feels snappy). Batch: minimize turnaround time or maximize throughput (complete large computations efficiently)." },
    { front: "What is I/O-aware scheduling?", back: "Treating each CPU burst between I/O operations as a separate short job. This allows the scheduler (e.g., STCF) to interleave I/O-bound processes efficiently — they naturally get high priority because their CPU bursts are short." },
    { front: "What is the separation of policy and mechanism in scheduling?", back: "Mechanism: the low-level dispatcher code that performs context switches (rarely changes). Policy: the high-level scheduling logic that decides which job to run next (easily swappable). Separating them improves maintainability." }
    ],
  },
  {
    id: "mlfq",
    label: "Multi-Level Feedback Queue",
    group: "os",
    groupLabel: "Operating Systems",
    courses: ["CS 537"],
    cards: [
    { front: "What problem does MLFQ solve?", back: "Balancing turnaround time and response time without prior knowledge of job lengths. It adapts to job behavior dynamically." },
    { front: "What are the basic MLFQ rules?", back: "Rule 1: If Priority(A) &gt; Priority(B), A runs. Rule 2: If Priority(A) = Priority(B), run in Round Robin. New jobs start at the highest priority queue." },
    { front: "How does MLFQ classify jobs dynamically?", back: "Jobs that use their entire time slice (CPU-bound/batch) get demoted to a lower priority queue. Jobs that give up the CPU before the slice expires (I/O-bound/interactive) stay at high priority. Past behavior predicts future behavior." },
    { front: "What causes starvation in MLFQ and how is it fixed?", back: "Long-running jobs keep getting demoted and may never run if interactive jobs keep arriving. Fix: periodic Priority Boost — move all jobs to the highest priority queue at regular intervals." },
    { front: "How can a process game MLFQ, and what's the countermeasure?", back: "A process could issue a fake I/O call just before its time slice expires to stay at high priority. Fix: track total CPU time at each level — demote based on accumulated time, not just per-slice behavior." }
    ],
  },
  {
    id: "lottery-scheduling",
    label: "Lottery &amp; Stride Scheduling",
    group: "os",
    groupLabel: "Operating Systems",
    courses: ["CS 537"],
    cards: [
    { front: "How does Lottery Scheduling work?", back: "Each process holds tickets proportional to its desired CPU share. The scheduler picks a random ticket number; the process whose ticket range includes that number runs for the next time slice." },
    { front: "What is the fairness trade-off of Lottery Scheduling?", back: "Only statistically fair over the long run. In the short term, randomness can cause significant deviations from intended proportions. Longer time horizon → closer to proportional." },
    { front: "Why does randomness simplify Lottery Scheduling's implementation?", back: "No complex global state tracking needed. Choosing a winner only requires generating a random number and scanning the ticket list — O(n) per decision but very simple code." },
    { front: "How does Stride Scheduling improve on Lottery Scheduling?", back: "It's deterministic: each process has a stride (inverse of its tickets) and a pass counter. The process with the lowest pass runs next, then its pass is incremented by its stride. Guarantees exact proportional share over time." },
    { front: "What is processor affinity and why does it matter?", back: "The preference to keep a process on the same CPU core to maximize cache reuse. Migrating a process to a different core means its cached data is cold on the new core. Multi-core schedulers use per-core queues with work stealing for load balancing." },
    { front: "What is work stealing in multi-core scheduling?", back: "When a CPU core's local run queue is empty, it 'steals' a process from another core's queue. Balances load across cores while preserving cache affinity for most processes." }
    ],
  },
  {
    id: "fork-exec",
    label: "fork(), exec(), wait()",
    group: "os",
    groupLabel: "Operating Systems",
    courses: ["CS 537"],
    cards: [
    { front: "What does fork() do and what does it return?", back: "Creates a child process by cloning the parent's state, code, and data. Returns the child's PID to the parent. Returns 0 to the child. Returns -1 on failure." },
    { front: "What does exec() do?", back: "Replaces the current process image (code, data, heap, stack) with a new program from an executable file. The PID stays the same. If successful, exec() never returns." },
    { front: "Why is the fork()+exec() model considered wasteful yet powerful?", back: "Wasteful: fork copies the entire address space just to overwrite it with exec. (COW mitigates this.) Powerful: between fork and exec, the child can set up its environment (I/O redirection, environment variables) before loading the new program — essential for shells." },
    { front: "What is the purpose of wait()?", back: "Pauses the parent until one of its children terminates. Retrieves the child's exit status and cleans up its process table entry. Without wait(), terminated children become zombies." },
    { front: "What is a zombie process?", back: "A process that has terminated but still occupies an entry in the process table because its parent hasn't called wait(). The zombie holds its exit status until the parent retrieves it." },
    { front: "What happens to an orphan process?", back: "If a parent terminates before its child, the OS re-parents the orphan to the init process (PID 1), which periodically calls wait() to clean up orphaned zombies." }
    ],
  },
  {
    id: "locks",
    label: "Locks (Spinlocks, Ticket Locks, Mutexes)",
    group: "concurrency",
    groupLabel: "Concurrency",
    courses: ["CS 537"],
    cards: [
    { front: "What is a critical section?", back: "A segment of code that accesses shared variables and must not be executed by more than one thread at a time. Protecting it with a lock ensures mutual exclusion." },
    { front: "What three properties should a good lock provide?", back: "Mutual exclusion (only one thread in the critical section). Progress/deadlock-freedom (if multiple threads want the lock, one must eventually get it). Bounded waiting/starvation-freedom (every waiting thread eventually gets the lock)." },
    { front: "Why does a simple load-and-store lock implementation fail?", back: "Testing the flag and setting it are two separate instructions. A context switch between them lets another thread also see the flag as 0 (free) and enter the critical section — violating mutual exclusion." },
    { front: "What is a spinlock?", back: "A lock where the waiting thread repeatedly checks (spins on) the lock variable in a tight loop until it becomes available. Simple but wastes CPU cycles while spinning." },
    { front: "Why is spinning wasteful on a uniprocessor?", back: "The spinning thread uses its entire time slice doing no useful work. The thread holding the lock can't run to release it until the spinner's time slice expires — guaranteed wasted time." },
    { front: "How does yielding improve on pure spinning?", back: "A thread that finds the lock busy calls yield() to relinquish the CPU, allowing the OS to schedule the lock holder (or other threads). Still has overhead: O(threads × context_switch_cost) in the worst case." },
    { front: "What is Two-Phase Waiting (spin-then-block)?", back: "Spin for a short fixed time (hoping the lock releases quickly). If still locked, block on a waiting queue and sleep. Competitive within a factor of 2 of the optimal strategy even without knowing lock hold time." },
    { front: "What is fine-grained locking?", back: "Using multiple locks (e.g., one per node in a linked list) instead of one big lock for the entire data structure. Increases concurrency but adds complexity and risk of deadlock." },
    { front: "Why is disabling interrupts insufficient for locking on multiprocessors?", back: "Disabling interrupts only prevents preemption on the local CPU. Threads on other CPUs can still access shared memory concurrently — mutual exclusion is not achieved." }
    ],
  },
  {
    id: "atomic-ops",
    label: "Atomic Operations (xchg, CAS, FAA)",
    group: "concurrency",
    groupLabel: "Concurrency",
    courses: ["CS 537"],
    cards: [
    { front: "What does the xchg(addr, newval) instruction do?", back: "Atomically returns the old value at addr while setting addr to newval — as a single uninterruptible operation. Used to implement spinlocks: while(xchg(&amp;flag, 1) == 1) spin; // old value 1 means lock was held." },
    { front: "How does CompareAndSwap (CAS) work?", back: "CAS(addr, expected, new): if *addr == expected, set *addr = new and return success. Otherwise do nothing and return failure. All in one atomic step. Basis for lock-free data structures." },
    { front: "How does FetchAndAdd (FAA) work?", back: "FAA(addr): atomically returns the current value of *addr and increments it by 1. Used in ticket locks: each thread gets a unique ticket number via FAA on the ticket counter." },
    { front: "How does a Ticket Lock use FAA to ensure fairness?", back: "Acquire: thread does FAA on 'ticket' counter to get its turn number. Then spins until the shared 'turn' variable equals its ticket. Release: increment 'turn'. Guarantees FIFO ordering — no starvation." },
    { front: "Why do atomic instructions solve the load-and-store problem?", back: "They combine the test and set into a single hardware-guaranteed uninterruptible operation. No context switch can occur between checking and modifying the lock variable." }
    ],
  },
  {
    id: "condition-vars",
    label: "Condition Variables",
    group: "concurrency",
    groupLabel: "Concurrency",
    courses: ["CS 537"],
    cards: [
    { front: "What is a condition variable?", back: "An explicit queue that threads put themselves on when a condition is not met (waiting) and are woken from when the condition changes (signaling). Always used in conjunction with a mutex lock." },
    { front: "What are the three atomic actions of wait(cv, lock)?", back: "1) Put the calling thread to sleep on cv's queue. 2) Release the lock. 3) Upon being woken, reacquire the lock before wait() returns. All three happen atomically to prevent race conditions." },
    { front: "What happens when signal(cv) is called with no waiters?", back: "The signal is lost — condition variables don't remember or store signals. This is why a separate state variable (like 'done = 1') is needed alongside the CV." },
    { front: "Why must wait() be called inside a while loop, not an if statement?", back: "Mesa semantics: between the signal and the wakeup, another thread could change the shared state. The woken thread must re-verify the condition before proceeding — it might need to wait again." },
    { front: "Why must a lock be held when calling wait() or signal()?", back: "To prevent the race where: thread A checks the condition (it's false), context switches to thread B which changes the condition and signals, then thread A sleeps on the CV and misses the signal forever." },
    { front: "What does pthread_cond_broadcast() do and when is it needed?", back: "Wakes ALL threads waiting on a CV (vs. signal which wakes one). Needed when multiple threads might be able to proceed — e.g., in producer/consumer with multiple buffer slots becoming available." },
    { front: "Why keep a separate state variable alongside a condition variable?", back: "Signals are not persistent. If signal() fires before any thread has called wait(), the signal is lost. The state variable (e.g., done = 1) lets a thread check if the event already happened and skip the wait entirely." }
    ],
  },
  {
    id: "producer-consumer",
    label: "Producer/Consumer Problem",
    group: "concurrency",
    groupLabel: "Concurrency",
    courses: ["CS 537"],
    cards: [
    { front: "What is the Producer/Consumer (Bounded Buffer) problem?", back: "Producers add items to a fixed-size buffer. Consumers remove items. The producer must wait when the buffer is full; the consumer must wait when it's empty. Both must have exclusive access to the buffer during modification." },
    { front: "Why must the producer and consumer have separate condition variables?", back: "With a single CV, a producer's signal might wake another producer instead of a consumer (or vice versa). This can cause all threads to sleep with no one to wake them — effectively a deadlock." },
    { front: "What is the correct synchronization pattern for producer/consumer?", back: "Two CVs: 'not_full' (producer waits on, consumer signals) and 'not_empty' (consumer waits on, producer signals). One mutex protects the buffer. Both wait() calls must use while loops (Mesa semantics)." }
    ],
  },
  {
    id: "race-condition",
    label: "Race Conditions",
    group: "concurrency",
    groupLabel: "Concurrency",
    courses: ["CS 537", "CS 544"],
    cards: [
    { front: "What is a race condition?", back: "A bug where program correctness depends on the uncontrollable timing or order of thread instruction interleaving. The result may differ between runs depending on how the scheduler interleaves threads." },
    { front: "Why are race conditions hard to debug?", back: "They are non-deterministic — the bug may only surface under specific (rare) interleavings. The program might work correctly thousands of times before failing once, making reproduction difficult." },
    { front: "What makes an operation 'atomic' in multi-threaded code?", back: "It appears to execute as a single uninterruptible unit from the perspective of other threads. No other thread can observe a partial result. Can be achieved with hardware atomic instructions or locks." }
    ],
  },
  {
    id: "deadlock",
    label: "Deadlock",
    group: "concurrency",
    groupLabel: "Concurrency",
    courses: ["CS 537", "CS 544"],
    cards: [
    { front: "What is deadlock?", back: "Two or more threads are permanently blocked because each holds a resource the other needs and neither will release its held resource. No thread can make progress." },
    { front: "What are the four necessary conditions for deadlock?", back: "1) Mutual exclusion: resources can't be shared. 2) Hold-and-wait: threads hold resources while waiting for others. 3) No preemption: resources can't be forcibly taken. 4) Circular wait: a cycle of threads each waiting for the next's resource." },
    { front: "How does lock ordering prevent deadlock?", back: "Assign a global total order to all locks. All threads must acquire locks in this order. This makes circular wait impossible — if thread A holds lock 1 and wants lock 2, no thread can hold lock 2 while wanting lock 1." },
    { front: "What is the simplest way to prevent deadlock?", back: "Eliminate any one of the four necessary conditions. In practice, eliminating circular wait via lock ordering is the most common approach. Alternatively: acquire all locks at once (eliminate hold-and-wait) or use trylock (allow preemption)." }
    ],
  },
  {
    id: "concurrency-bugs",
    label: "Concurrency Bugs (Atomicity/Order Violations)",
    group: "concurrency",
    groupLabel: "Concurrency",
    courses: ["CS 537"],
    cards: [
    { front: "What are the two most common types of non-deadlock concurrency bugs?", back: "Atomicity violation bugs and Order violation bugs (found by Lu et al. study)." },
    { front: "What is an atomicity violation bug?", back: "A sequence of memory accesses that the programmer assumed would execute atomically gets interleaved by another thread, violating the intended invariant. Fix: wrap the sequence in a lock." },
    { front: "What is an order violation bug?", back: "Two memory accesses across threads have an assumed order (A must happen before B), but no synchronization enforces it. Thread B may execute before A. Fix: use condition variables or barriers to enforce ordering." },
    { front: "Give an example of an atomicity violation.", back: "Thread 1: if (ptr != NULL) { use(ptr); }  Thread 2: ptr = NULL;  If Thread 2 runs between Thread 1's check and use, Thread 1 dereferences NULL. The check-then-use should be atomic." },
    { front: "Give an example of an order violation.", back: "Thread 1: creates an object. Thread 2: uses the object. If Thread 2 runs first, it accesses uninitialized memory. A condition variable should enforce that Thread 1 completes initialization before Thread 2 proceeds." }
    ],
  },
  {
    id: "relational-model",
    label: "Relational Model &amp; Algebra",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 564"],
    cards: [
    { front: "What is a relation in the relational model?", back: "A set of tuples defined over a set of attributes, each with a specific domain. In pure relational algebra it's a set (no duplicates). In SQL it's a multiset (duplicates allowed for performance)." },
    { front: "What is the difference between a relation schema and a database schema?", back: "Relation schema: one table's name, attributes, types, nullability, and constraints. Database schema: the collection of all relation schemas plus cross-table constraints (foreign keys)." },
    { front: "What does the Selection operator σ_C(R) do?", back: "Filters rows: returns only tuples from R that satisfy condition C. Output schema is identical to input. Selection is idempotent and commutative." },
    { front: "What does the Projection operator π do?", back: "Outputs only the specified columns. In relational algebra, duplicates are removed. In SQL, duplicates are kept unless DISTINCT is used (because duplicate removal is expensive)." },
    { front: "What is required for Set Union, Intersection, or Difference?", back: "The two relations must be union-compatible: same number of fields with corresponding fields having the same domains. Set Intersection is redundant: R1 ∩ R2 = R1 - (R1 - R2)." },
    { front: "What is a Cross Product (R1 × R2)?", back: "Every tuple in R1 paired with every tuple in R2. Output has all attributes of R1 followed by all of R2. If R1 has n rows and R2 has m rows, the result has n × m rows." },
    { front: "How is a Theta Join defined in terms of basic operators?", back: "R1 ⋈_θ R2 = σ_θ(R1 × R2). Cross product followed by selection on condition θ. An Equi-Join uses only equality predicates." },
    { front: "How does a Natural Join differ from an Equi-Join?", back: "Natural Join automatically equi-joins on all attributes sharing the same name AND removes the duplicate columns. Equi-Join retains both copies of the join attributes." },
    { front: "What does the Division operator R/S return?", back: "All values a such that for every tuple b in S, the tuple (a, b) exists in R. Implements 'for all' queries — e.g., 'find sailors who reserved ALL boats.'" },
    { front: "What is the Aggregation operator γ?", back: "γ_{X, Agg(Y)}(R): groups tuples by attributes X, applies aggregate function Agg (SUM, COUNT, AVG, MIN, MAX) to attribute Y within each group. Output schema: grouping attributes + aggregated results." },
    { front: "What does the Renaming operator ρ do?", back: "Changes the name of a relation and/or its attributes without modifying the actual data. Used to resolve naming conflicts in self-joins or cross products." },
    { front: "What is the 'cascading of selection' property?", back: "A selection with AND conditions can be broken into a chain of individual selections: σ_{C1 ∧ C2}(R) = σ_{C1}(σ_{C2}(R)). Useful for query optimization — push selections down the tree." }
    ],
  },
  {
    id: "sql-basics",
    label: "SQL: SELECT, JOIN, GROUP BY, Subqueries",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 564", "CS 544"],
    cards: [
    { front: "What are DDL and DML commands?", back: "DDL (Data Definition Language): CREATE, DROP, ALTER — define/modify schema. DML (Data Manipulation Language): INSERT, UPDATE, DELETE, SELECT — manipulate data within tables." },
    { front: "What is the conceptual evaluation order of a SQL query?", back: "FROM (cross product) → WHERE (filter rows) → GROUP BY (form groups) → HAVING (filter groups) → SELECT (project columns) → ORDER BY (sort) → LIMIT (truncate)." },
    { front: "Why can't WHERE filter on aggregate results?", back: "WHERE operates on individual rows before grouping. Aggregates are computed on groups formed by GROUP BY. Use HAVING to filter based on aggregate values." },
    { front: "What restriction applies to SELECT columns in a GROUP BY query?", back: "Every non-aggregated column in SELECT must appear in the GROUP BY clause. Otherwise the DBMS doesn't know which value to pick from the group." },
    { front: "What are the two meanings of NULL and how does SQL handle them?", back: "Missing (exists but unknown) or Inapplicable (doesn't apply). Any arithmetic with NULL → NULL. Any comparison with NULL → UNKNOWN. Use IS NULL / IS NOT NULL to test." },
    { front: "How does SQL's 3-valued logic work?", back: "Values: TRUE (1), FALSE (0), UNKNOWN (0.5). AND = min of values. OR = max. NOT = 1 - value. WHERE only produces output for TRUE — UNKNOWN rows are excluded." },
    { front: "Why does 'WHERE x &gt; 5 OR x &lt;= 5' miss some rows?", back: "Rows where x is NULL evaluate both conditions to UNKNOWN. OR of UNKNOWN and UNKNOWN = UNKNOWN, which is not TRUE, so those rows are excluded." },
    { front: "What is the difference between UNION, INTERSECT, EXCEPT and their ALL variants?", back: "Without ALL: removes duplicates. UNION ALL keeps all copies (sum of counts). INTERSECT ALL keeps min copies. EXCEPT ALL keeps the difference in counts (if positive)." },
    { front: "What is a correlated subquery?", back: "A subquery that references a value from the outer query, requiring re-execution for each outer row. The outer alias is visible inside the subquery. Often replaceable with a JOIN for better performance." },
    { front: "What is the difference between a VIEW and a WITH clause?", back: "CREATE VIEW: persists a named query in the database schema — reusable across sessions. WITH: defines a temporary named result set for a single query — gone after execution." },
    { front: "How do COUNT(*) and COUNT(column) differ?", back: "COUNT(*) counts all rows including NULLs. COUNT(column) counts only non-NULL values in that column. COUNT(DISTINCT column) counts unique non-NULL values." },
    { front: "What does the EXISTS operator check?", back: "Returns TRUE if the subquery returns at least one row, FALSE otherwise. Used for existence checks without caring about the actual values returned." },
    { front: "What do ANY and ALL do with comparison operators?", back: "x op ANY (subquery): TRUE if condition holds for at least one row. x op ALL (subquery): TRUE if condition holds for every row. Using = with a subquery returning multiple rows requires ANY/ALL or IN." }
    ],
  },
  {
    id: "er-modeling",
    label: "ER Modeling &amp; Schema Design",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 564"],
    cards: [
    { front: "What are the three main ER diagram elements?", back: "Entity sets (rectangles), Attributes (ovals), Relationships (diamonds connecting entity sets)." },
    { front: "How are cardinality constraints shown in ER diagrams?", back: "Arrow from entity to relationship: at most one (key constraint). No arrow: many. Thin line: partial participation (some entities may not participate). Thick line: total participation (every entity must participate)." },
    { front: "What does an arrow + thick line together mean?", back: "Exactly one — the entity participates in at most one relationship instance (arrow) AND must participate in at least one (thick line). E.g., 'every department has exactly one manager.'" },
    { front: "How is a many-to-many relationship mapped to tables?", back: "Create a junction table whose primary key is the combination of primary keys from both participating entity sets. Include any descriptive attributes of the relationship." },
    { front: "How is a one-to-many relationship mapped to tables?", back: "Place the foreign key in the table on the 'many' side, referencing the primary key of the 'one' side. If participation is total on the many side, mark the FK as NOT NULL." },
    { front: "How can a many-to-one relationship reduce the number of tables?", back: "Instead of creating a separate relationship table, merge the relationship's attributes and the FK into the 'many'-side table. This is an optimization during logical design." },
    { front: "What are the three options for mapping a class hierarchy to tables?", back: "Option 1: separate table per subclass (each contains inherited + specific attributes). Option 2: subclass tables reference superclass PK (join needed). Option 3: single table with NULLs for inapplicable attributes." },
    { front: "What is a Foreign Key constraint?", back: "A value in one table must match a value in a referenced table's primary key or unique column. Enforcement options on delete/update: NO ACTION (reject), CASCADE (propagate), SET NULL, SET DEFAULT." },
    { front: "When are edge labels needed in an ER diagram?", back: "When an entity set plays more than one role in the same relationship (e.g., an Employee can be both a 'manager' and a 'subordinate' in a 'manages' relationship)." }
    ],
  },
  {
    id: "normal-forms",
    label: "Functional Dependencies &amp; BCNF",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 564"],
    cards: [
    { front: "What is a functional dependency (FD) X → B?", back: "Any two tuples that agree on all attributes in X must also agree on attribute B. This is domain knowledge (a constraint on all valid instances), NOT something inferred from one table instance." },
    { front: "What is the closure X⁺ of an attribute set?", back: "The set of all attributes functionally determined by X. Computed iteratively: start with X, then for each FD Y → Z where Y ⊆ current set, add Z. Repeat until no change." },
    { front: "How do you determine if X is a superkey?", back: "Compute X⁺. If X⁺ contains all attributes of the relation, then X is a superkey. A key is a minimal superkey — no proper subset of it is also a superkey." },
    { front: "What are Armstrong's Axioms?", back: "Reflexivity: if Y ⊆ X, then X → Y. Augmentation: if X → Y, then XZ → YZ. Transitivity: if X → Y and Y → Z, then X → Z. They are sound (only generate valid FDs) and complete (generate all implied FDs)." },
    { front: "What is Boyce-Codd Normal Form (BCNF)?", back: "For every non-trivial FD X → B, X must be a superkey. Equivalently: for every attribute set X, either X⁺ = X (trivial) or X⁺ = all attributes (superkey). Eliminates all redundancy from FDs." },
    { front: "How do you decompose a relation into BCNF?", back: "Find a violating FD X → B where X is not a superkey. Split R into R1(X⁺) and R2(X ∪ attributes not in X⁺). Repeat on each result until all are in BCNF." },
    { front: "What is a lossless-join decomposition?", back: "Splitting R into R1 and R2 such that R1 ⋈ R2 exactly recreates R (no spurious tuples). The test: the common attributes (R1 ∩ R2) must functionally determine either R1 or R2." },
    { front: "What is a dependency-preserving decomposition?", back: "The union of FDs enforceable within each decomposed table can logically infer all original FDs. Without this, some constraints require expensive cross-table joins to verify." },
    { front: "Why might 3NF be chosen over BCNF?", back: "Some relations cannot be decomposed into BCNF while preserving all functional dependencies. 3NF relaxes the requirement slightly: allows X → B where B is part of a candidate key, even if X isn't a superkey." }
    ],
  },
  {
    id: "heap-files",
    label: "Heap Files &amp; Record Layout",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 564"],
    cards: [
    { front: "What is a Record ID (RID)?", back: "A unique locator for a record: (page ID, slot number). Used by the DBMS to find any record in constant time given its RID." },
    { front: "What are the two approaches for organizing heap file pages?", back: "Linked list: pages chained together with free-space pages in a separate list (may need to scan many pages). Page directory: a small structure tracking free space per page (faster insertion lookups, more scalable)." },
    { front: "How does packed vs. unpacked organization handle fixed-length records?", back: "Packed: records stored contiguously with no gaps. Deletion requires shifting records (changes RIDs). Unpacked: uses a bitmap to track which slots are occupied. Deletion just clears a bit (RIDs stable)." },
    { front: "How does a slotted page handle variable-length records?", back: "Slot directory at the page bottom grows upward; records are placed from the top downward. Free space is in the middle. Each slot entry stores (offset, length). A free-space pointer tracks where the next record can go." },
    { front: "What happens when a variable-length record is deleted?", back: "The slot entry is set to offset -1 (empty). Remaining records are shifted to consolidate free space and maintain the free-space pointer. The slot directory entry itself remains to preserve other RIDs." },
    { front: "Where is schema information stored?", back: "The System Catalog: stores field counts, types, offsets, and sizes for all record types. Used to compute field addresses within records (fixed-length: add known offsets; variable-length: use offset arrays)." },
    { front: "What are the two methods for handling variable-length fields within a record?", back: "Delimiters between fields (simple but requires scanning the whole record). Array of offsets at the start of the record (direct access to any field, handles NULLs by setting end-pointer = start-pointer)." }
    ],
  },
  {
    id: "buffer-manager",
    label: "Buffer Manager (Pin Count, Dirty Bit, LRU/Clock)",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 564"],
    cards: [
    { front: "What does the buffer manager do?", back: "Manages the transfer of pages between disk and main memory. Maintains a pool of page-sized frames in RAM. Higher layers request pages; the buffer manager handles caching, eviction, and write-back." },
    { front: "What do pin count and dirty bit track?", back: "Pin count: number of active users of a page — can't evict until it reaches 0. Dirty bit: whether the page has been modified in memory — must be written to disk before eviction." },
    { front: "What happens when a requested page is not in the buffer pool?", back: "If there's an empty frame, use it. Otherwise, pick a victim frame with pin count = 0. If the victim is dirty, write it to disk first. Then read the requested page into the frame, set pin count to 1." },
    { front: "How does LRU work for buffer replacement?", back: "Maintains a queue of frames with pin count = 0. When a frame is unpinned, it goes to the MRU (end) position. Eviction takes from the LRU (front) position. Good for random access patterns." },
    { front: "How does the Clock algorithm work for buffer replacement?", back: "Circular scan with a referenced bit per frame. On access: set bit to 1. On eviction scan: if bit = 1, clear to 0 and advance. If bit = 0, evict. Lower overhead than maintaining an LRU queue." },
    { front: "What is sequential flooding and why does LRU cause it?", back: "When a repeated sequential scan cycles through K+1 pages with only K buffer frames, LRU evicts the oldest page — which is always the next one needed. Every access is a miss (0% hit rate). MRU performs better for this pattern." },
    { front: "What is the I/O cost of modifying a page already in the buffer pool?", back: "Zero immediate I/O cost — the modification happens entirely in memory. I/O occurs later when the dirty page is evicted or explicitly flushed." }
    ],
  },
  {
    id: "bplus-tree",
    label: "B+ Trees",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 564"],
    cards: [
    { front: "What defines a B+ tree?", back: "A height-balanced tree where all leaf nodes are at the same depth. Data pointers/records are stored exclusively in leaf nodes. Internal nodes store keys and child pointers for routing searches." },
    { front: "What are the occupancy rules for B+ tree nodes of order d?", back: "Non-root nodes: between d and 2d entries (keys). Root: at least 1 entry. Internal nodes with m entries have m+1 child pointers." },
    { front: "How do B+ tree internal node pointers work?", back: "Left of K1: values &lt; K1. Between K1 and K2: values where K1 ≤ v &lt; K2. Right of last key: values ≥ last key. This invariant guides search from root to leaf." },
    { front: "How do B+ tree leaves support range queries?", back: "Leaf nodes are linked via previous and next pointers. After finding the range start with a root-to-leaf search, traverse the leaf chain sequentially." },
    { front: "What happens when a B+ tree leaf overflows on insertion?", back: "The leaf splits into two. Entries are divided evenly. The middle key is copied up to the parent. If the parent overflows, it splits too and pushes its middle key up — potentially all the way to a new root." },
    { front: "What happens when a B+ tree node underflows on deletion?", back: "First attempt redistribution: borrow entries from a sibling. If that's not possible (sibling at minimum), merge with the sibling and delete an entry from the parent. Many real systems skip structural shrinking since databases typically grow." },
    { front: "What is the typical fill factor and height formula?", back: "Fill factor F ≈ 2/3. Effective fan-out f = (2d+1) × F. Height h = log_f(N) where N is the number of leaf pages. Top levels are usually cached, so actual I/Os per search = h minus cached levels." },
    { front: "How is the order d calculated given page size P, key size K, and pointer size A?", back: "2d × K + (2d + 1) × A ≤ P. Solve for d. Larger keys → smaller d → lower fan-out → taller tree → more I/Os." },
    { front: "What is key compression and why is it useful?", back: "Storing abbreviated keys in internal nodes — they only need enough information to route traffic, not the full key. Increases fan-out, which reduces tree height and search I/O." },
    { front: "How are duplicate keys handled in B+ trees?", back: "Solution 1: store (key, RID) pairs as the search key — duplicates become a contiguous run in the leaf level. Solution 2: one entry per key with an overflow chain of RIDs (fewer leaf pages but more complex)." }
    ],
  },
  {
    id: "hashing",
    label: "Static &amp; Extendible Hashing",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 564"],
    cards: [
    { front: "What are the two qualities of a good hash function?", back: "Fast to compute and uniform (distributes keys evenly across buckets, minimizing clustering and overflow)." },
    { front: "What is a bucket in static hashing?", back: "One primary page plus zero or more overflow pages chained together. I/O cost of equality search = 1 + number of overflow pages." },
    { front: "What is the main limitation of static hashing?", back: "The number of buckets is fixed. As the database grows, overflow chains get longer, degrading search performance. Shrinking wastes space since empty buckets aren't reclaimed." },
    { front: "How does extendible hashing avoid static hashing's problems?", back: "Uses a directory of pointers indexed by the last 'global depth' bits of the hash. On bucket overflow, only the affected bucket splits — the directory doubles only when local depth equals global depth." },
    { front: "What are global depth and local depth?", back: "Global depth: the number of hash bits used to index the directory (determines directory size = 2^global_depth). Local depth: the number of bits common to all keys in a specific bucket." },
    { front: "When does the directory double in extendible hashing?", back: "Only when a bucket overflows AND its local depth equals the global depth — meaning the current directory can't accommodate a split without growing. Local depth of both new buckets becomes local_depth + 1." },
    { front: "Why is directory doubling a relatively cheap operation?", back: "The directory is much smaller than the data pages (just pointers) and typically fits entirely in main memory. Only the overflowing bucket's data is reorganized." },
    { front: "What is the main advantage of tree-based indexes over hash-based?", back: "Trees support both equality and range queries efficiently. Hash indexes only support equality searches — there's no ordering of keys to traverse for ranges." }
    ],
  },
  {
    id: "indexes",
    label: "Primary, Secondary &amp; Clustered Indexes",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 564"],
    cards: [
    { front: "What is the difference between a search key and a primary key?", back: "A search key is any attribute(s) used to look up records in an index — not necessarily unique. A primary key uniquely identifies tuples in the relation." },
    { front: "What is a primary index?", back: "An index whose search key is the primary key of the relation. Contains no duplicate search key values. A table can have only one primary index." },
    { front: "What is a secondary index?", back: "Any index whose search key is not the primary key. May contain duplicates. A table can have many secondary indexes. Can be 'unique' if the search key is a candidate key." },
    { front: "What is a clustered index?", back: "The physical order of records on disk matches the order of entries in the index. At most one per table. Highly beneficial for range queries — sequential I/O instead of random." },
    { front: "What are the three secondary index designs?", back: "Design 1: secondary index entries store RIDs (direct to record location). Design 2: both primary and secondary store RIDs. Design 3: secondary stores the primary key value — decouples from physical location; only primary index needs updating when records move." }
    ],
  },
  {
    id: "lsm-tree",
    label: "LSM Trees (MemTable, SSTables, Compaction)",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 564"],
    cards: [
    { front: "What is an LSM tree and why is it write-optimized?", back: "Log-Structured Merge tree. All writes go to an in-memory buffer (MemTable). When full, it's flushed to disk as a sorted immutable file (SSTable). All disk I/O is sequential — unlike B+ trees which require random I/O for writes." },
    { front: "What are the components of a two-level LSM tree?", back: "C₀: memory-resident tree (e.g., B-tree) that receives all inserts and updates. C₁: disk-resident sorted structure. When C₀ is full, a rolling merge incrementally combines C₀ and C₁ into a new C₁." },
    { front: "How does a modern multi-level LSM tree work?", back: "MemTable → Level 0 SSTables (may overlap) → Level 1+ SSTables (non-overlapping key ranges within each level). Capacity increases exponentially per level (T, T², T³...). Compaction merges SSTables down levels." },
    { front: "How is a lookup performed in an LSM tree?", back: "Check MemTable first, then each level from top to bottom. The first match found is the most recent version. Worst case: must check every level × binary search within each SSTable." },
    { front: "How are deletes handled in an LSM tree?", back: "Insert a tombstone record into the MemTable. During compaction, when the tombstone meets the original record, both are removed. Until compaction, the tombstone masks the old value during lookups." },
    { front: "What is read amplification in an LSM tree?", back: "A lookup may need to read from multiple SSTables across multiple levels before finding the key (or confirming it doesn't exist). More levels = more potential reads." },
    { front: "What is write amplification in an LSM tree?", back: "During compaction, data is read and rewritten sequentially as SSTables merge. The same data may be rewritten multiple times as it moves through levels. Trade-off for sequential I/O on writes." },
    { front: "During a rolling merge, which value is kept if a key exists in both C₀ and C₁?", back: "The C₀ (memory) value — it's more recent. If the C₀ entry is a tombstone, the C₁ entry is deleted." }
    ],
  },
  {
    id: "external-sort",
    label: "External Merge Sort",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 564"],
    cards: [
    { front: "Why can't standard in-memory sorting (QuickSort) be used for 1TB of data on 8GB RAM?", back: "The data doesn't fit in memory. External merge sort works by sorting manageable chunks that DO fit in memory, then merging them using a small number of buffer pages." },
    { front: "What are three database operations besides ORDER BY that use sorting?", back: "Aggregation (GROUP BY), duplicate elimination (DISTINCT), and sort-merge joins." },
    { front: "What happens in Pass 0 of external merge sort?", back: "Split the file into chunks of B pages each. Read each chunk into memory, sort it in-place, write it back as a sorted 'run'. Creates ⌈N/B⌉ initial runs. I/O cost: 2N (N reads + N writes)." },
    { front: "How does 2-way merge sort work after Pass 0?", back: "Using B=3 buffer frames (2 input + 1 output), merge pairs of runs into larger sorted runs. Each pass merges all runs, halving the count. Total passes: ⌈log₂(N/B)⌉ + 1. Total I/O: 2N × (number of passes)." },
    { front: "How does multi-way merge sort improve on 2-way?", back: "Uses B-1 input buffers + 1 output buffer. Each pass merges B-1 runs into one. Total passes: ⌈log_{B-1}(N/B)⌉ + 1. Dramatically fewer passes for large B. Total I/O: 2N × (number of passes)." },
    { front: "Under what condition can a dataset be sorted in exactly two passes?", back: "N ≤ B(B-1). With 4 GB of memory and 4 KB pages (B = 1M), this allows sorting roughly 4 Petabytes in just two passes." },
    { front: "Why is one buffer page reserved during the merge phase?", back: "It serves as the output buffer — merged records accumulate there until a full page is ready to write to disk. Without it, every merged record would require its own disk write." },
    { front: "What triggers refilling an empty input buffer during merging?", back: "When all records from that buffer's corresponding run have been consumed in the merge comparison. The next page of that run is read from disk into the now-empty buffer." }
    ],
  },
  {
    id: "acid",
    label: "ACID Properties",
    group: "data",
    groupLabel: "Data Systems",
    courses: ["CS 544", "CS 564"],
    cards: [
    { front: "What does ACID stand for?", back: "Atomicity (all-or-nothing — partial work is rolled back), Consistency (application invariants are maintained), Isolation (concurrent transactions don't see each other's intermediate states), Durability (committed data survives crashes)." },
    { front: "What is the difference between commit and rollback?", back: "Commit: finalizes a transaction, making all its changes permanent and visible. Rollback: abandons a transaction, undoing all changes as if it never happened." },
    { front: "How does 'isolation' in ACID relate to 'atomicity' in concurrency?", back: "They describe the same concept at different levels. ACID isolation: a transaction's intermediate state is invisible to others. Concurrency atomicity: a critical section appears to execute as one uninterruptible unit." }
    ],
  },
  {
    id: "protocol-stack",
    label: "Internet Protocol Stack (5 Layers)",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What are the five layers of the Internet Protocol Stack?", back: "Application → Transport → Network → Link → Physical (top to bottom). Each layer provides services to the layer above and uses services of the layer below." },
    { front: "What are the data unit names at each layer?", back: "Application: Message. Transport: Segment. Network: Datagram. Link: Frame. Physical: Bits." },
    { front: "What is the horizontal vs. vertical view of a protocol layer?", back: "Horizontal: peer interface — communicates with the same layer on another device. Vertical: service interface — provides services to the layer above." },
    { front: "What defines a protocol?", back: "The format and order of messages exchanged between entities, and the actions taken upon transmission or receipt." },
    { front: "What is layering and why is it used?", back: "A modular approach using multiple levels of abstraction. Each layer has a well-defined interface. Changes to one layer's implementation don't affect others, enabling independent development and evolution." }
    ],
  },
  {
    id: "encoding",
    label: "Signal Encoding (NRZ, NRZI, Manchester, 4B/5B)",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What is encoding in data transmission?", back: "Transforming binary data into discrete signals suitable for the communication medium. The receiver decodes signals back to bits. The invariant: bits sent = bits received." },
    { front: "What is NRZ encoding and what are its problems?", back: "Non-Return to Zero: 1 = high signal, 0 = low signal. Problems: baseline wander (average signal drifts during long runs of same bit) and loss of clock synchronization (no transitions to sync on)." },
    { front: "How does NRZI improve on NRZ?", back: "Non-Return to Zero Inverted: a 1 is represented by a transition, a 0 by no transition. Solves the clock problem for runs of 1s, but long runs of 0s still produce no transitions." },
    { front: "How does 4B/5B encoding work?", back: "Every 4 data bits are mapped to a 5-bit code (80% efficiency). Codes are designed so no more than three consecutive 0s can occur, ensuring frequent transitions when used with NRZI. Max 1 leading zero, max 2 trailing zeros per code." },
    { front: "What is Manchester encoding's trade-off?", back: "A transition occurs in the middle of every bit period — guarantees clock recovery. But requires double the baud rate (50% efficiency) because each bit needs a full transition." },
    { front: "What is baud rate vs. bit rate?", back: "Baud rate: number of signal state changes per second. Bit rate: number of data bits transmitted per second. NRZ: baud = bit rate. Manchester: baud = 2 × bit rate. 4B/5B+NRZI: baud = 1.25 × bit rate." },
    { front: "What is modulation?", back: "Changing signal attributes to encode data for transmission. Three attributes can be modulated: amplitude (signal strength), frequency (signal speed), and phase (signal timing offset)." }
    ],
  },
  {
    id: "error-detection",
    label: "Error Detection (Parity, CRC)",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What is even parity and what are its limitations?", back: "Append a bit so the total number of 1s is even. 12.5% overhead (1 in 8 bits). Can only detect single-bit errors — multi-bit errors that preserve the parity go undetected." },
    { front: "How does 2-D parity improve on simple parity?", back: "Applies parity across rows AND columns of a bit block. Can detect and correct single-bit errors (intersection of the failing row and column). Can detect (but not correct) some multi-bit errors." },
    { front: "How does CRC (Cyclic Redundancy Check) work?", back: "Treat the frame as a polynomial M(x). Divide by a pre-agreed generator polynomial C(x). Append the remainder as the checksum. The receiver divides the received frame by C(x) — zero remainder means no error." },
    { front: "Why is CRC preferred over simple checksums?", back: "Detects all single-bit, double-bit, and odd-number-of-bit errors, plus bursts up to the degree of the generator polynomial. Hardware-friendly: implemented efficiently with shift registers and XOR gates. Ethernet uses CRC-32." },
    { front: "Why is error correction harder than error detection?", back: "Correction requires enough redundancy in the encoding to self-correct without retransmission. Detection only needs to identify that something is wrong — retransmission handles the rest." }
    ],
  },
  {
    id: "ethernet",
    label: "Ethernet &amp; CSMA/CD",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What is Ethernet and what is its IEEE standard?", back: "The most widely used LAN technology. IEEE 802.3. Succeeded because it was first widely deployed, simple, cheap, and continuously evolved to higher speeds." },
    { front: "What does CSMA/CD stand for and how does each part work?", back: "Carrier Sense: listen before sending (channel idle or busy?). Multiple Access: shared medium with probabilistic sending. Collision Detection: if collision detected, abort immediately and perform exponential back-off (T = 2^(i-1) × X)." },
    { front: "Why is CSMA/CD no longer needed in modern Ethernet?", back: "Switches create isolated collision domains with full-duplex links. Each port has its own collision domain. Send and receive operate simultaneously — collisions are impossible." },
    { front: "How did Ethernet topology evolve?", back: "1970s: shared bus (all frames to all adapters). 1990s: hub-based star (still one collision domain — hub is a multi-port repeater). 2000s+: switch-based star (each port is its own collision domain)." },
    { front: "What is the Ethernet frame structure?", back: "Preamble (8 bytes: 7 for clock sync + 1 start-of-frame delimiter) → Destination MAC → Source MAC → Type/Length → Payload → CRC-32 checksum." },
    { front: "What does the naming convention 10BASE-T mean?", back: "10 = 10 Mbps data rate. BASE = baseband (carries only Ethernet). T = twisted-pair copper. Other examples: 10BASE-2 (thin coax), 10BASE-5 (thick coax), 100BASE-FX (fiber)." },
    { front: "What are three common causes of frame loss at the link layer?", back: "Corruption during transmission (noise), cable errors (physical damage), and software/hardware failures at the switch." }
    ],
  },
  {
    id: "stp",
    label: "Spanning Tree Protocol",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What does the Spanning Tree Protocol (STP) do?", back: "Detects and breaks loops in a Layer 2 switched network by disabling redundant links. The result is a loop-free tree topology. IEEE 802.1D." },
    { front: "Why are loops dangerous in a Layer 2 network?", back: "Broadcast frames circulate forever, flooding the network and consuming all bandwidth. Switches' MAC address tables become confused (the same MAC appears on multiple ports). STP prevents this." },
    { front: "What is the key design principle of STP?", back: "Maintain minimal state — each switch only needs to know the root bridge, its distance to the root, and which ports to block. This makes the protocol highly scalable." }
    ],
  },
  {
    id: "sliding-window",
    label: "Sliding Window Protocol",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What is the sender's invariant in the Sliding Window Protocol?", back: "LFS - LAR ≤ SWS. The number of outstanding (sent but unacknowledged) frames must not exceed the Send Window Size. LFS = Last Frame Sent, LAR = Last Acknowledgment Received." },
    { front: "What is the receiver's invariant?", back: "LAF - LFR ≤ RWS. The receiver only accepts frames within the Receive Window Size of the last received frame. LAF = Largest Acceptable Frame, LFR = Last Frame Received." },
    { front: "What does the sender do on a timeout?", back: "Retransmits the timed-out frame. LAR and LFS are NOT changed — the retransmission doesn't affect the window boundaries." },
    { front: "When does the sender update LAR?", back: "Only when the received acknowledgment's sequence number matches the expected value (LAR + 1). Then the sender frees the buffer for acknowledged frames and can send more within the window." },
    { front: "What is a NAK and when is it sent?", back: "Negative Acknowledgment — sent by the receiver to accelerate retransmission when it detects a gap (received a frame out of order). The sender can retransmit immediately without waiting for timeout." },
    { front: "How are SWS and RWS determined?", back: "Based on the Bandwidth-Delay Product (BDP): the amount of data 'in flight' that fills the network pipe. SWS and RWS are typically set to BDP / frame_size, and can be adjusted dynamically." }
    ],
  },
  {
    id: "packet-switching",
    label: "Packet Switching vs Circuit Switching",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What is store-and-forward transmission?", back: "The switch must receive the entire packet before forwarding it. If packet has L bits and link rate is R, transmission delay = L/R. End-to-end through one switch = 2 × L/R." },
    { front: "What happens when a switch buffer fills up?", back: "Incoming packets are dropped. Buffers are typically fixed-size SRAM. This is why packet switching provides 'best-effort' delivery — no guarantees." },
    { front: "What is the difference between packet switching and circuit switching?", back: "Packet: share links statistically (high utilization, simple, variable delay, not ideal for real-time). Circuit: reserve dedicated resources (predictable performance, but low utilization during idle periods)." },
    { front: "What is a forwarding table?", back: "Maps destination addresses to output ports. Used by switches and routers to determine where to send each incoming packet. Can be implemented with TCAM (Ternary Content Addressable Memory) for fast lookups." }
    ],
  },
  {
    id: "network-delay",
    label: "Network Delay (Processing, Queuing, Transmission, Propagation)",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What are the four components of nodal delay?", back: "Processing (examine header, determine destination), Queuing (wait in output buffer), Transmission (L/R — push all bits onto the link), Propagation (signal travel time across the physical medium)." },
    { front: "What is traffic intensity and when does the queue grow unbounded?", back: "Traffic intensity = La/R (arrival rate × packet length / link rate). When &gt; 1, packets arrive faster than they can be transmitted and the queue grows without bound." },
    { front: "Why can queuing delay occur even when average traffic intensity &lt; 1?", back: "Traffic is bursty — multiple packets can arrive simultaneously. Even if the average rate is below capacity, short bursts cause temporary queue buildup." },
    { front: "If N packets arrive at a queue simultaneously, what is the queuing delay for the nth packet?", back: "(n-1) × L/R. The first packet has zero queuing delay; each subsequent packet waits for all preceding packets to be transmitted." }
    ],
  },
  {
    id: "ip-addressing",
    label: "IP Addressing (Classful, CIDR, Subnetting)",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "How many bits in an IPv4 address and how is it written?", back: "32 bits total, written in dotted-decimal notation: each of the 4 bytes in decimal, separated by periods (e.g., 192.168.1.1)." },
    { front: "What were the classful address ranges?", back: "Class A: prefix 0, 8-bit network (1.0.0.0–127.x.x.x, 16M hosts). Class B: prefix 10, 16-bit network (128.0–191.255, 65K hosts). Class C: prefix 110, 24-bit network (192.0.0–223.x.x, 254 hosts). Class D: 1110 (multicast). Class E: 1111 (experimental)." },
    { front: "Why was classful addressing inefficient?", back: "Rigid block sizes rarely matched actual needs. A Class B with 65K addresses mostly wasted for a 500-host organization. Too many small Class C networks bloated routing tables." },
    { front: "What is CIDR (Classless Inter-Domain Routing)?", back: "Variable-length prefixes (a.b.c.d/x) replace rigid classes. The prefix can be any length from /0 to /32. Enables precise allocation and route aggregation (supernetting) for scalability." },
    { front: "What is subnetting?", back: "Partitioning a single address block into smaller internal networks using a subnet mask that extends the network prefix. The mask has 1s for network bits and 0s for host bits." },
    { front: "What is supernetting (route aggregation)?", back: "Combining multiple contiguous address blocks into a single routing entry with a shorter prefix. Reduces routing table size by representing many networks as one." },
    { front: "What is the broadcast address of a CIDR block?", back: "The address where all host bits are set to 1. For the local network, 255.255.255.255 is the standard broadcast address." },
    { front: "What is an IP interface?", back: "The communication port connecting a host to a physical link. Each interface has its own IP address. A router has multiple interfaces (one per connected network), each with a different IP." }
    ],
  },
  {
    id: "dhcp",
    label: "DHCP",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What is DHCP?", back: "Dynamic Host Configuration Protocol — automatically assigns IP addresses from a pool to hosts. Eliminates manual configuration. Assigned addresses have a time-limited lease that must be periodically refreshed." },
    { front: "What are the four steps of DHCP?", back: "1) Discover: client broadcasts (src 0.0.0.0, dst 255.255.255.255) to find servers. 2) Offer: server proposes an address. 3) Request: client accepts an offer. 4) ACK: server confirms with lease duration." },
    { front: "Why does DHCP Discover use source 0.0.0.0 and destination 255.255.255.255?", back: "The client has no IP yet (0.0.0.0) and doesn't know any server's address, so it must broadcast (255.255.255.255) to reach all potential DHCP servers on the local network." },
    { front: "What ports do DHCP client and server use?", back: "Server listens on port 67. Client receives on port 68. The transaction ID in the message matches requests with responses." },
    { front: "Why must DHCP leases be refreshed?", back: "To inform the server the IP is still in use. If a host disconnects without releasing, the lease eventually expires and the server reclaims the IP for other hosts." }
    ],
  },
  {
    id: "nat",
    label: "NAT (Network Address Translation)",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What problem does NAT solve?", back: "IPv4 address exhaustion — the entire private network appears as a single public IP. Multiple internal hosts share one public address." },
    { front: "How does NAT differentiate between internal hosts?", back: "Uses transport-layer port numbers. The NAT translation table maps (internal IP, internal port) ↔ (public IP, external port) for each active connection." },
    { front: "What are the three private IP address ranges?", back: "Class A: 10.0.0.0–10.255.255.255. Class B: 172.16.0.0–172.31.255.255. Class C: 192.168.0.0–192.168.255.255. Packets with private source addresses are dropped on the public Internet." },
    { front: "How does NAT break the end-to-end principle?", back: "Internal hosts aren't directly reachable from outside without explicit port mappings. NAT modifies packet headers in transit, violating the assumption that packets travel unmodified between endpoints." }
    ],
  },
  {
    id: "ipv6",
    label: "IPv6",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "Why does IPv6 exist?", back: "IPv4's 32-bit address space (~4.3 billion) is exhausted. IPv6 uses 128-bit addresses — approximately 3.4 × 10^38 addresses, or ~1,500 per square foot of Earth's surface." },
    { front: "How is an IPv6 address written?", back: "Eight 16-bit values in hexadecimal, separated by colons. One series of consecutive zero blocks can be replaced by :: (e.g., 2001:db8::1)." },
    { front: "How does IPv6 handle fragmentation differently than IPv4?", back: "IPv6 routers do NOT fragment. If a packet exceeds the link MTU, it's dropped and an error is sent back. The sending host must discover the Path MTU and fragment accordingly." },
    { front: "Why was the checksum removed from the IPv6 header?", back: "To speed up router processing. Bit-level errors are already checked by Layer 2 (CRC) and Layer 4 (TCP/UDP checksums). Removing it avoids redundant per-hop computation." },
    { front: "What are the key IPv6 header fields that differ from IPv4?", back: "Traffic Class (= IPv4 ToS). Flow Label (identifies a flow for QoS). Hop Limit (= IPv4 TTL). Next Header (identifies upper-layer protocol or extension headers). No header length field (fixed 40-byte header)." },
    { front: "How does IPv6 handle options?", back: "Via extension headers pointed to by the Next Header field — not in the main header. Routers only process extensions addressed to them, speeding up forwarding of normal packets." }
    ],
  },
  {
    id: "routing",
    label: "Distance Vector Routing &amp; Bellman-Ford",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What is Distance Vector routing?", back: "Each router maintains a table of (destination, cost, next-hop). Periodically shares its entire distance vector with direct neighbors. Routes are computed using the Bellman-Ford equation: D_i(N) = min_j[t_ij + D_j(N)]." },
    { front: "What does convergence mean in routing?", back: "The state where all routers have consistent, accurate routing information and have stopped exchanging updates. During convergence, packets may be misrouted." },
    { front: "What is the count-to-infinity problem?", back: "When a link fails, routers using stale neighbor info keep incrementing hop counts to the failed destination in a loop. Each router thinks the other has a valid path. Only terminates when the count reaches a predefined 'infinity' threshold." },
    { front: "What is the simple fix for count-to-infinity?", back: "Define a small number (e.g., 16) as infinity. When the distance reaches this value, the destination is considered unreachable. Trade-off: limits the maximum network diameter (hop count)." },
    { front: "How many iterations does Bellman-Ford need to converge?", back: "At most N-1 iterations for N nodes. In each iteration, shortest paths using up to one more hop are discovered." },
    { front: "Why is Bellman-Ford used for Distance Vector instead of Dijkstra's?", back: "Bellman-Ford only requires information from direct neighbors — naturally distributed. Dijkstra's requires knowledge of the entire network topology (used in Link-State routing like OSPF)." }
    ],
  },
  {
    id: "bgp",
    label: "BGP &amp; Inter-AS Routing",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What is an Autonomous System (AS)?", back: "A collection of IP networks and routers managed by a single organization with a consistent routing policy. Examples: ISPs, universities, large enterprises, content providers like Google." },
    { front: "What is the difference between intra-AS and inter-AS routing?", back: "Intra-AS (e.g., OSPF): optimizes paths within one AS using metric-based algorithms. Inter-AS (BGP): routes between ASes prioritizing policy compliance over pure cost optimization." },
    { front: "Why is policy prioritized over optimality in BGP?", back: "ASes have business relationships (customer, provider, peer) and contractual obligations. A technically shorter path through a non-paying peer may be economically unacceptable. Loop-free paths and policy compliance come first." },
    { front: "What is the BGP path preference hierarchy?", back: "Routes from customers preferred over routes from peers, which are preferred over routes from providers. Rationale: customer routes generate revenue; provider routes cost money." },
    { front: "What is the difference between peering and customer-provider relationships?", back: "Peering: two ASes freely exchange traffic to each other's customers — no payment. Customer-provider: customer pays the provider for transit to reach the rest of the Internet." },
    { front: "What is Hot Potato Routing?", back: "The router forwards packets to the nearest exit gateway (least intra-AS cost) to leave its own AS as quickly as possible. Ignores the path cost once the packet enters external networks." },
    { front: "What are BGP export policies?", back: "Rules controlling which routes an AS advertises to neighbors. Typically: advertise customer routes to everyone. Advertise own routes to everyone. Don't advertise provider/peer routes to other providers/peers (to avoid providing free transit)." }
    ],
  },
  {
    id: "multicast",
    label: "IP Multicast &amp; IGMP",
    group: "networking",
    groupLabel: "Networking",
    courses: ["CS 640"],
    cards: [
    { front: "What is IP multicast?", back: "Sending the same data to multiple receivers simultaneously — one transmission serves many recipients. More efficient than unicasting the same data to each receiver separately." },
    { front: "What address class is used for multicast and how are groups identified?", back: "Class D (224.0.0.0–239.255.255.255). Each multicast group is identified by a Class D address. Hosts join groups to receive traffic." },
    { front: "What is IGMP?", back: "Internet Group Management Protocol — allows hosts to signal their local router that they want to join or leave a specific multicast group. Routers only forward multicast traffic if at least one local recipient exists." },
    { front: "What are three applications that benefit from multicast?", back: "Video/audio broadcasts (live streaming), video conferencing, and real-time news/data distribution (stock tickers, gaming)." }
    ],
  },
  {
    id: "hdfs",
    label: "HDFS (NameNode, DataNode, Replication)",
    group: "distributed",
    groupLabel: "Distributed Systems",
    courses: ["CS 544"],
    cards: [
    { front: "What is HDFS's architecture?", back: "Boss/worker: NameNode (stores metadata — which blocks exist, which DataNodes hold them) and DataNodes (store actual data blocks). Clients get block locations from NameNode, then read/write directly to DataNodes. Data never flows through the NameNode." },
    { front: "Why do HDFS writes use pipelined replication?", back: "Client sends to DN1 → DN1 forwards to DN2 → DN2 forwards to DN3. Distributes network load instead of the client uploading 3 copies. Prevents the client (potentially a weak machine) from being the bottleneck." },
    { front: "How much I/O does a 1 MB write vs. read generate on a triply-replicated file?", back: "Write: 3 MB (one copy on each of 3 DataNodes). Read: 1 MB (all 3 replicas are identical — just read from one, preferably the closest)." },
    { front: "Why is the NameNode a single point of failure and how is it mitigated?", back: "If the NameNode dies, all metadata (file→block→DataNode mappings) is lost. Mitigation: NameNode writes metadata to multiple disks, uses a secondary/standby NameNode, and can be backed up." }
    ],
  },
  {
    id: "replication",
    label: "Replication &amp; Partitioning",
    group: "distributed",
    groupLabel: "Distributed Systems",
    courses: ["CS 544"],
    cards: [
    { front: "What is replication and why is it used?", back: "Maintaining multiple copies of data on different machines. Provides fault tolerance (data survives machine failures) and read performance (serve from the closest/least-loaded replica)." },
    { front: "What is partitioning and why is it used?", back: "Breaking data into smaller pieces distributed across machines. Enables parallel processing (each machine handles a subset) and scalability (add machines to handle more data)." },
    { front: "What is the trade-off between replication factor and storage cost?", back: "Higher replication = better fault tolerance and read throughput, but proportionally more storage and write bandwidth consumed. Typical default: 3 replicas." }
    ],
  },
  {
    id: "mapreduce",
    label: "MapReduce",
    group: "distributed",
    groupLabel: "Distributed Systems",
    courses: ["CS 544"],
    cards: [
    { front: "What are the map and reduce function signatures?", back: "map(key, value) → emits (key, value) pairs. reduce(key, values) → processes all values with the same key on a single machine. Between them, a shuffle groups values by key." },
    { front: "What determines the number of output files in MapReduce?", back: "The number of reducers — each reducer produces one output file. Keys are hash-partitioned across reducers." },
    { front: "What can you say about the keys within a single reduce task?", back: "They are sorted. The reduce function is called multiple times per task, once per unique key, with keys arriving in sorted order." },
    { front: "What are MapReduce's performance limitations?", back: "Intermediate data must be materialized to distributed storage (e.g., HDFS) between stages. Multi-stage pipelines require separate MapReduce jobs. Spark addresses both by keeping intermediates in memory and supporting lazy DAG execution." }
    ],
  },
  {
    id: "spark",
    label: "Spark (RDDs, Transformations, Actions)",
    group: "distributed",
    groupLabel: "Distributed Systems",
    courses: ["CS 544"],
    cards: [
    { front: "What is an RDD (Resilient Distributed Dataset)?", back: "Spark's core abstraction: an immutable, partitioned collection processed in parallel across a cluster. 'Resilient' because it can be recomputed from its lineage (the chain of transformations that created it) if a partition is lost." },
    { front: "What is the difference between transformations and actions in Spark?", back: "Transformations (map, filter, join) are lazy — they describe computation without executing. Actions (collect, count, save) trigger actual execution of the entire transformation chain." },
    { front: "What is the difference between narrow and wide transformations?", back: "Narrow: each input partition contributes to at most one output partition (no shuffle — e.g., map, filter). Wide: output partitions may need data from multiple input partitions (requires network shuffle — e.g., groupByKey, join)." },
    { front: "What does a Spark task operate on?", back: "A single partition, on a single CPU core. The partition is loaded entirely into memory. More partitions = more parallelism but more task overhead." },
    { front: "When would you want bigger vs. smaller Spark partitions?", back: "Bigger: fewer partitions → less task scheduling overhead. Smaller: better parallelism (more cores utilized), more even load balancing, lower peak memory per task." },
    { front: "How does Spark improve over MapReduce?", back: "Intermediate data can stay in memory (no materializing to HDFS between stages). Lazy DAG execution lets the optimizer reorganize the computation. Supports iterative algorithms efficiently (cache RDDs across iterations)." },
    { front: "What does df.cache() do in Spark?", back: "Marks a DataFrame/RDD to be kept in memory after it's first computed. Subsequent actions reuse the cached data instead of recomputing the entire lineage. Use df.unpersist() to release." }
    ],
  },
  {
    id: "kafka",
    label: "Kafka (Topics, Partitions, Consumer Groups)",
    group: "distributed",
    groupLabel: "Distributed Systems",
    courses: ["CS 544"],
    cards: [
    { front: "What is Kafka's core abstraction?", back: "A distributed commit log organized into topics, each split into partitions. Producers append messages to partitions. Consumers read at offsets (positions in the log). Messages are persistent and ordered within a partition." },
    { front: "How does Kafka determine which partition a message goes to?", back: "If a key is provided: partition = hash(key) % partition_count (same key always goes to the same partition). If no key: round-robin across partitions." },
    { front: "When can Kafka guarantee message ordering?", back: "Only within the same topic AND partition. Messages with the same key are guaranteed to go to the same partition, so same-key ordering is guaranteed. Cross-partition ordering is NOT guaranteed." },
    { front: "What is a consumer group?", back: "A set of consumers that cooperatively read from a topic. Each partition is assigned to exactly one consumer in the group. Multiple consumer groups can independently read the same topic (each sees all messages)." },
    { front: "Why might you want multiple consumers in the same group?", back: "To scale consumption: different consumers on different machines handle different partitions of a high-volume topic. More consumers = more read parallelism (up to the number of partitions)." },
    { front: "What is the difference between log rollover and deletion in Kafka?", back: "Rollover: switching to a new active file when the current one reaches a size/age limit — old file is finalized but kept. Deletion: removing non-active files that exceed the retention policy (age or total size)." }
    ],
  },
  {
    id: "kafka-replication",
    label: "Kafka Replication &amp; Exactly-Once Semantics",
    group: "distributed",
    groupLabel: "Distributed Systems",
    courses: ["CS 544"],
    cards: [
    { front: "When is a Kafka message considered 'committed'?", back: "When it's written to ALL in-sync replicas — not just the leader. This prevents data loss if the leader fails before propagating to followers." },
    { front: "What does 'in-sync replica' (ISR) mean?", back: "A follower replica that has fetched batches from the leader recently enough (configurable time window). It doesn't need every message — just to not be too far behind. The ISR set is dynamic." },
    { front: "Why doesn't Kafka acknowledge a message as soon as min.insync.replicas have it?", back: "If the leader acks and then dies, the new leader might be the one replica that DIDN'T have the message. It could write different data at that offset, changing a previously committed message. Kafka waits for ALL ISRs to prevent this." },
    { front: "What are the three acks settings for Kafka producers?", back: "acks=0: don't wait for any acknowledgment (fastest, may lose data). acks=1: wait for leader to write to its log. acks='all': wait for all in-sync replicas (safest, slowest)." },
    { front: "What is at-least-once vs. at-most-once delivery?", back: "At-least-once: retry until acknowledged — message delivered 1 to N times (may duplicate). At-most-once: never retry — message delivered 0 or 1 times (may lose). Exactly-once requires idempotency." },
    { front: "What does idempotent mean and how does it enable exactly-once?", back: "An operation where performing it multiple times has the same effect as once. If the receiver tracks operation IDs and ignores duplicates, retries become safe — achieving exactly-once semantics." },
    { front: "How can a Kafka consumer guarantee exactly-once processing?", back: "Atomically write output AND commit offsets in the same transaction. E.g., two INSERTs in the same database transaction: one for the actual output, one to record the Kafka offset. On crash/restart, the consumer resumes from the committed offset." },
    { front: "What is a write anomaly vs. a read anomaly in Kafka?", back: "Write anomaly: a message was acknowledged as written but is not readable later (data loss). Read anomaly: a message was read, but disappears when re-read (inconsistency). Both indicate replication failures." }
    ],
  },
  {
    id: "file-formats",
    label: "File Formats (Parquet, Row vs Column Oriented)",
    group: "distributed",
    groupLabel: "Distributed Systems",
    courses: ["CS 544"],
    cards: [
    { front: "What is row-oriented vs. column-oriented storage?", back: "Row (e.g., CSV): all fields of one record stored together — good for transactions (read/write entire rows). Column (e.g., Parquet): all values of one column stored together — good for analytics (read only needed columns, better compression)." },
    { front: "Why does Parquet not need schema inference like CSV does?", back: "Parquet files have schema information (column names, types) built into the file metadata. CSVs are plain text — the reader must infer that a column of strings like '123' should be integers." },
    { front: "What does Snappy compression prioritize?", back: "Speed over compression ratio. It compresses and decompresses very fast but doesn't achieve the smallest possible file size. Commonly used in Spark and Parquet." },
    { front: "What are dictionary encoding and run-length encoding?", back: "Dictionary: replace repeated large values (e.g., strings) with short numeric codes, keeping a lookup table. Run-length: replace consecutive repeated values with (value, count). Both exploit column-oriented repetition patterns." }
    ],
  },
  {
    id: "oltp-olap",
    label: "OLTP vs OLAP, Warehouses vs Lakes",
    group: "distributed",
    groupLabel: "Distributed Systems",
    courses: ["CS 544"],
    cards: [
    { front: "What is the difference between OLTP and OLAP?", back: "OLTP (Online Transaction Processing): operates on individual rows — insert, update, delete (e.g., placing an order). OLAP (Online Analytics Processing): computes over whole columns — aggregations, scans (e.g., 'total revenue by region')." },
    { front: "What is a data warehouse?", back: "An OLAP database with integrated storage and compute engine. Data is collected from multiple OLTP sources via ETL pipelines. Optimized for analytical queries, not row-level transactions." },
    { front: "What is a data lake?", back: "Distributed file storage (e.g., HDFS, S3) with a decoupled analytics engine (e.g., Spark). Data stored in open formats (Parquet). More flexible than a warehouse — easier to use non-SQL tools like ML libraries." },
    { front: "What does ETL stand for and what does it do?", back: "Extract Transform Load. Extracts data from source systems (e.g., OLTP databases), transforms it (clean, aggregate, reshape), and loads it into an analytical store (warehouse or lake)." },
    { front: "What is the trade-off between a warehouse and a data lake?", back: "Warehouse: tightly integrated storage + query engine → better performance. Lake: decoupled storage + engine → more flexibility to use diverse tools (SQL, ML, custom code) on the same data." }
    ],
  },
  {
    id: "grpc-protobuf",
    label: "gRPC &amp; Protocol Buffers",
    group: "distributed",
    groupLabel: "Distributed Systems",
    courses: ["CS 544"],
    cards: [
    { front: "What is gRPC and what is it built on?", back: "A Remote Procedure Call framework by Google. Built on HTTP — every RPC is an HTTP POST request. Arguments go in the request body, return values in the response body." },
    { front: "What are Protocol Buffers (protobuf)?", back: "Google's binary serialization format used by gRPC. Defined in .proto files containing messages (data structures) and services (RPC endpoints). Uses variable-length integer encoding (small values use fewer bytes)." },
    { front: "What is serialization/deserialization?", back: "Serialization: converting in-memory data structures to bytes for transmission over the network. Deserialization: the reverse. Protobuf is more compact than JSON/XML but requires a schema." },
    { front: "What is variable-length encoding's trade-off?", back: "Pro: saves space for small values (e.g., a small int uses 1 byte instead of 4). Con: CPUs can't operate on variable-length integers directly — must convert to fixed-width before computation." }
    ],
  },
  {
    id: "cloud",
    label: "Cloud Computing (IaaS/PaaS, Spot Instances)",
    group: "distributed",
    groupLabel: "Distributed Systems",
    courses: ["CS 544"],
    cards: [
    { front: "What is the difference between IaaS and PaaS?", back: "IaaS (Infrastructure as a Service): rent raw resources — VMs, disks, networks. You deploy and manage systems yourself. PaaS (Platform as a Service): provider runs a system on your behalf (e.g., managed MySQL, S3). More convenient but often more expensive." },
    { front: "What are on-demand vs. spot instances?", back: "On-demand: fixed price, guaranteed availability. Spot: variable (usually cheaper) price, but the VM can be preempted (taken away) if the provider needs resources for higher-priority work." },
    { front: "What is cloud lock-in?", back: "Difficulty migrating away from a cloud provider. Causes: high network egress costs to move data out, and application code written to provider-specific APIs (e.g., S3, BigQuery) that don't exist elsewhere." },
    { front: "What is the typical geographic hierarchy in cloud computing?", back: "Continents → Regions → Zones. Zones in the same region are geographically near but have separate power and network infrastructure, making correlated failures unlikely." },
    { front: "What is the difference between ingress and egress costs?", back: "Ingress (data uploaded to cloud): usually free. Egress (data downloaded from cloud): charged per GB, with cost increasing as data crosses zone → region → cloud boundaries. Transferring out of the cloud entirely is most expensive." },
    { front: "What do you still pay for when a VM is powered off but not deleted?", back: "The virtual disk attached to the VM — the provider must keep your data on storage so the VM can boot again later. CPU and memory charges stop." }
    ],
  },
  {
    id: "ml-taxonomy",
    label: "ML Taxonomy (Supervised/Unsupervised/RL)",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is machine learning?", back: "A field that gives computers the ability to learn patterns from data without being explicitly programmed." },
    { front: "What are the three main categories of ML?", back: "Supervised (labeled data, predict outputs), Unsupervised (no labels, find structure), Reinforcement (agent learns actions that maximize cumulative reward)." },
    { front: "What is the difference between classification and regression?", back: "Classification: label is discrete (cat vs. dog). Regression: label is continuous (house price). Both are supervised." },
    { front: "How is data represented in ML?", back: "As vectors where each dimension is a feature. The number of dimensions is the feature dimension. Labels are usually scalars (regression) or discrete categories (classification)." },
    { front: "What is self-supervised learning?", back: "Uses an unlabeled dataset and generates its own supervision signal from the data. Examples: next-word prediction for LLMs, image inpainting for vision." },
    { front: "What is training error vs. test error?", back: "Training error: how well the model fits the data it learned from. Test error: how well it predicts on unseen data. A large gap means the model overfit." }
    ],
  },
  {
    id: "uninformed-search",
    label: "Uninformed Search (BFS, DFS, UCS, IDS)",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What defines a search problem?", back: "State space (all valid configurations), initial state, goal state, successor function (states reachable in one step), and cost function. Goal: find a path with minimum cost." },
    { front: "What is the fringe in search?", back: "The data structure holding states generated but not yet expanded. The choice of fringe data structure determines the search strategy." },
    { front: "How does BFS work and what are its properties?", back: "Expands shallowest nodes first using a queue. Complete, optimal for uniform-cost edges. Time and space: O(b^d) where b is branching factor and d is goal depth." },
    { front: "How does DFS work and what are its properties?", back: "Expands deepest nodes first using a stack. Not complete (may loop), not optimal. Space: O(bm) where m is max depth. Good when memory is tight." },
    { front: "What is Uniform Cost Search?", back: "Expands the node with the lowest total path cost using a priority queue. Optimal for variable edge costs. Time/space: O(b^(C*/e)) where C* is optimal cost and e is the minimum edge cost." },
    { front: "How does Iterative Deepening combine BFS and DFS?", back: "Runs DFS repeatedly with increasing depth limits. Complete and optimal like BFS, space like DFS at O(bd). The repeated shallow work is negligible compared to the final level." },
    { front: "How do you handle repeated states in graph search?", back: "Maintain a closed set of already-expanded nodes. Skip any node already in the closed set before expanding. Prevents infinite loops in graphs with cycles." }
    ],
  },
  {
    id: "informed-search",
    label: "Informed Search (A*, IDA*, Beam Search)",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What does informed search add over uninformed?", back: "A heuristic h(s): an estimate of the remaining cost from state s to the goal. Used alongside the actual path cost g(s) to guide expansion toward promising states." },
    { front: "How does A* search work?", back: "Expands nodes in order of f(s) = g(s) + h(s). Requires h(s) to be admissible. Terminates when the goal is popped from the queue, not when first generated." },
    { front: "What makes a heuristic admissible?", back: "It never overestimates the true cost: 0 <= h(s) <= actual cost to goal. This guarantees A* finds the optimal path." },
    { front: "Can A* revisit already-expanded states?", back: "Yes. A* may later find a cheaper path to a previously expanded node. With a consistent heuristic (h(s) <= cost(s,s') + h(s')), revisiting is unnecessary." },
    { front: "How does IDA* save memory?", back: "Like iterative deepening but uses an f-cost threshold instead of depth. Each iteration skips nodes with g(s)+h(s) > threshold. Complete and optimal with DFS-level memory." },
    { front: "What is Beam Search?", back: "Uses a priority queue with a fixed maximum size k. Nodes beyond k are discarded. Memory-efficient but not complete or optimal." },
    { front: "What is Hill Climbing?", back: "Move from the current state to the neighbor with the best f(s). Repeat until no neighbor improves. Fast but gets stuck at local optima with no backtracking." }
    ],
  },
  {
    id: "game-theory",
    label: "Game Theory (Nash Equilibrium, Dominant Strategies)",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is the general agent-world model?", back: "An agent takes actions, receives observations and rewards from the world. Goal: maximize cumulative reward. Data consists of actions, observations, and rewards." },
    { front: "What is a strategy profile?", back: "The set of strategies chosen by all players. A strategy is strictly dominant if it produces a better outcome regardless of what other players do." },
    { front: "What is Nash Equilibrium?", back: "A strategy profile where no player benefits from unilaterally changing their own strategy. Every finite game has at least one NE (possibly mixed)." },
    { front: "What is Dominant Strategy Equilibrium?", back: "When every player has a strictly dominant strategy. It is automatically a Nash Equilibrium. Does not always exist." },
    { front: "What is the difference between pure and mixed Nash Equilibrium?", back: "Pure: each player deterministically picks one strategy. Mixed: players randomize over strategies with probabilities. Expected reward = sum of probability products times the reward." },
    { front: "What is the difference between zero-sum and general-sum games?", back: "Zero-sum: one player's gain equals the other's loss. General-sum: players can all benefit or all lose together." }
    ],
  },
  {
    id: "minimax",
    label: "Minimax &amp; Alpha-Beta Pruning",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "How does the Minimax algorithm work?", back: "DFS through a game tree. MAX nodes take the highest child value, MIN nodes take the lowest. Leaf values (rewards) propagate upward. Time: O(b^m), space: O(bm)." },
    { front: "How does alpha-beta pruning improve Minimax?", back: "Skips subtrees that cannot affect the final result. If a MIN node finds a value below MAX's current best, that branch is pruned. Reduces effective branching factor without changing the outcome." },
    { front: "How does Minimax handle very deep game trees?", back: "Limit search to depth d. At the depth limit, apply a heuristic evaluation function instead of the true terminal reward. Trades optimality for feasibility." }
    ],
  },
  {
    id: "knn",
    label: "K-Nearest Neighbors",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "How does KNN classify a new data point?", back: "Find the k nearest training points using a distance function. Assign the majority label among them. Non-parametric: makes no assumptions about the data distribution." },
    { front: "What are the three common distance functions for KNN?", back: "Hamming distance: for discrete features, count mismatches. Euclidean distance: for continuous features, straight-line. Manhattan distance: sum of absolute differences of features." },
    { front: "How does KNN do regression?", back: "Find the k nearest neighbors and return the mean of their labels instead of the majority vote." },
    { front: "How does k affect KNN?", back: "Small k: sensitive to noise, a single outlier can flip the label. Large k: biased toward the majority class. Pick k by minimizing error on a held-out tuning set." },
    { front: "What is the difference between parametric and non-parametric models?", back: "Parametric: assumes a specific distribution and learns fixed parameters (e.g., linear regression). Non-parametric: no distributional assumption, uses data directly (e.g., KNN). More flexible but slower at prediction time." }
    ],
  },
  {
    id: "naive-bayes",
    label: "Maximum Likelihood &amp; Naive Bayes",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is Maximum Likelihood Estimation?", back: "Finds parameters that maximize the probability of observing the training data. Assumes data is drawn independently from a fixed distribution." },
    { front: "What is the problem with MLE for unobserved outcomes?", back: "Any outcome not in training data gets probability 0. A test example containing it gets predicted probability 0 for the whole class. Fix: add-1 (Laplace) smoothing adds 1 to numerator and V to denominator." },
    { front: "How good is an MLE estimate?", back: "Depends on how likely the model is to generate the observed data. More data means better estimates. With little data, MLE tends to overfit the specific sample." },
    { front: "What is Naive Bayes?", back: "A probabilistic classifier that applies Bayes' theorem with the naive assumption that features are conditionally independent given the class. Predicts the class with the highest posterior probability." },
    { front: "What is the Naive Bayes independence assumption?", back: "Given the class label, all features are independent of each other. This is rarely true in practice but simplifies the joint probability into a product of individual feature probabilities." }
    ],
  },
  {
    id: "linear-regression",
    label: "Linear Regression &amp; Gradient Descent",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is regression?", back: "Predicting a continuous label. Goal: find a model with minimal loss that maps features to labels. The simplest form is linear: f(x) = theta_0 + x^T * theta." },
    { front: "What are the basic steps of supervised learning?", back: "Select a model class, select a loss function, optimize parameters to minimize loss, evaluate on test data." },
    { front: "What is gradient descent?", back: "Iterative optimization: move parameters in the direction opposite the gradient of the loss. Step size too large: overshoot. Too small: slow convergence." },
    { front: "What is the closed-form solution for linear regression?", back: "theta = (X^T X)^-1 X^T y. Minimizes squared loss directly without iteration. Requires X^T X to be invertible. Prepend 1 to each x vector to absorb the bias term into the dot product." },
    { front: "What is overfitting?", back: "A model performs well on training data but poorly on test data. It memorized noise rather than generalizable patterns. More complex model classes are more prone to it." }
    ],
  },
  {
    id: "logistic-regression",
    label: "Logistic Regression &amp; Classification",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "How does logistic regression convert a linear model to probabilities?", back: "p(y=1|x) = 1 / (1 + exp(-theta^T x)). The sigmoid function maps any real value to (0, 1). Large positive input gives probability near 1, large negative gives near 0." },
    { front: "How does logistic regression differ from linear regression?", back: "Linear regression: continuous output, squared loss. Logistic regression: binary classification (0 or 1), cross-entropy loss, sigmoid output." },
    { front: "What is cross-entropy loss for classification?", back: "Loss = -[y * log(p) + (1-y) * log(1-p)] for binary classification. Penalizes confident wrong predictions heavily. Minimized using gradient descent on the log-likelihood." }
    ],
  },
  {
    id: "perceptron",
    label: "Perceptron &amp; Activation Functions",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is a perceptron?", back: "A single neuron: output = activation(w dot x + b). The step function gives 1 if positive, 0 otherwise. We seek weights w and bias b that minimize classification error." },
    { front: "How does the perceptron learning algorithm work?", back: "Initialize w and b. For T iterations: pick a random point and predict its label. If prediction is wrong, update w and b toward the correct answer. Converges if data is linearly separable." },
    { front: "Why can a single perceptron not learn XOR?", back: "XOR is not linearly separable. No single hyperplane can separate the positive from negative examples. At least one hidden layer is needed." },
    { front: "What are the common activation functions?", back: "Step: maps to 0 or 1 strictly. Sigmoid: smooth, maps to (0,1). Tanh: maps to (-1,1). ReLU: returns x if positive, 0 otherwise." },
    { front: "Why is ReLU preferred over sigmoid in deep networks?", back: "Sigmoid gradients near 0 for large inputs, causing vanishing gradients in deep networks. ReLU has gradient 1 for positive inputs, so gradients flow through freely." }
    ],
  },
  {
    id: "neural-nets",
    label: "Multi-Layer Perceptron &amp; Backpropagation",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is a multi-layer perceptron?", back: "A network with one or more hidden layers between input and output. Each hidden node applies its own weights, bias, and activation. Outputs of one layer become inputs to the next." },
    { front: "Why must hidden layers use non-linear activations?", back: "With only linear activations, any deep network collapses to a single linear transformation. Non-linearity is what allows the network to learn complex functions." },
    { front: "How is softmax used for K-way classification?", back: "The output layer has K nodes. Softmax converts K raw values into probabilities summing to 1: P(class i) = exp(z_i) / sum(exp(z_j)). Predicted class is the one with highest probability." },
    { front: "How do you count total learnable parameters in an MLP?", back: "For each layer: (inputs * outputs) + outputs (biases). Cascade from the input size through each hidden layer to the output." },
    { front: "What is forward propagation?", back: "Passing input through each layer in sequence: multiply by weights, add bias, apply activation, pass result to next layer. Produces the final prediction and loss." },
    { front: "What is backpropagation?", back: "After the forward pass computes the loss, backprop uses the chain rule to compute the gradient of the loss with respect to each weight, propagating from output back to input." }
    ],
  },
  {
    id: "cnn",
    label: "Convolutional Neural Networks",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What two properties make convolution effective for images?", back: "Translation invariance: detecting a feature works wherever it appears in the image. Locality: only nearby pixels are related, so kernels look at local neighborhoods." },
    { front: "What is a 2D convolution?", back: "Slide a kernel matrix over the input. At each position, compute the sum of element-wise products. Output size: (n_h - k_h + 1) x (n_w - k_w + 1). Kernel weights and bias are learnable." },
    { front: "Why use convolution instead of fully connected layers for images?", back: "Fully connected layers on large images require millions of parameters. A convolutional layer only learns m * k weights (m outputs, k kernel size), exploiting spatial structure." },
    { front: "What does padding do?", back: "Adds zero-valued rows and columns around the input so each convolution layer does not shrink the output. Common choice is k-1 padding per axis." },
    { front: "What is stride?", back: "The step size of the sliding kernel. Stride 1 moves one pixel at a time. Stride 2 halves the output dimensions and reduces computation." },
    { front: "How do multiple input and output channels work?", back: "Multiple input channels: one kernel per channel, sum the results to get a single 2D output. Multiple output channels: one 3D kernel per output channel. Kernel dimension is c_out x c_in x k_h x k_w." },
    { front: "What is max pooling?", back: "A sliding window that outputs the maximum value in each window. No learnable parameters. Output channels equal input channels. Makes detection robust to small position shifts." },
    { front: "What is average pooling?", back: "A sliding window that outputs the average of values in each window instead of the max. No learnable parameters. Used in architectures like LeNet." }
    ],
  },
  {
    id: "resnet",
    label: "ResNets &amp; Residual Connections",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "Why does adding more layers not always improve classification?", back: "Vanishing gradients: gradients shrink as they propagate back through many layers. Training becomes unstable and deeper networks can perform worse than shallower ones." },
    { front: "What is a residual connection?", back: "A skip connection that adds the layer's input directly to its output: output = F(x) + x. The network only learns the residual F(x). If near-identity is optimal, F(x) close to 0 is easy to achieve." },
    { front: "What is batch normalization?", back: "Normalizes the activations at each layer to have the same mean and variance across the batch. Stabilizes training, reduces sensitivity to initialization, and allows higher learning rates." },
    { front: "What is the ResNet architecture?", back: "Stacks residual blocks, each with two 3x3 conv layers and a skip connection. Uses batch normalization throughout. Enables effective training of networks with 100+ layers." },
    { front: "Name the major CNN architecture progression.", back: "LeNet (small grayscale, 2 conv + 2 pool) → AlexNet (large color, ReLU, MaxPool, deeper) → VGG (uniform 3x3 convs) → Inception (parallel filter sizes) → ResNet (residual connections, 100+ layers)." }
    ],
  },
  {
    id: "rnn",
    label: "Recurrent Neural Networks",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is a Recurrent Neural Network?", back: "A neural network for sequential data (text, audio, time series). Uses cycles: the current input and the previous hidden state together produce the new hidden state, allowing information to persist." },
    { front: "What is the key limitation of basic RNNs?", back: "They struggle with long-term dependencies. Information from early time steps fades as it passes through many hidden state updates, similar to vanishing gradients in deep feedforward networks." },
    { front: "How are RNNs used for language modeling?", back: "Text is a sequence of tokens. At each step the RNN takes the current token plus the previous hidden state and predicts the next token. Goal: match the output distribution to the actual next token." }
    ],
  },
  {
    id: "transformers",
    label: "Transformers &amp; Attention Mechanism",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What problem do Transformers solve that RNNs cannot?", back: "RNNs process tokens one at a time (no parallelism) and struggle with long-range dependencies. Transformers process all tokens in parallel and use attention to connect any two tokens directly." },
    { front: "How does the attention mechanism compute contextual embeddings?", back: "Each token has Query (Q), Key (K), and Value (V) vectors from learned weight matrices. Attention weight = softmax(Q dot K^T). Contextual embedding = weighted sum of Values." },
    { front: "Why are three separate vectors (Q, K, V) used?", back: "A single fixed embedding limits expressiveness. Separate Q/K/V matrices let the model learn different roles: Q = what am I looking for, K = what do I contain, V = what do I contribute." },
    { front: "What is multi-head attention?", back: "Run multiple attention operations in parallel, each with different Q/K/V projections. Concatenate and linearly project the outputs. Captures different relationship types simultaneously." },
    { front: "Why do Transformers need positional encoding?", back: "Transformers have no recurrence and no inherent token order. Positional encodings (based on sine and cosine of position) are added to input embeddings to provide sequence order." },
    { front: "What is the Transformer architecture?", back: "Each layer has multi-head attention, a feed-forward network, residual connections, and layer normalization. Full model: Encoder maps input to continuous representations, Decoder generates output one token at a time." }
    ],
  },
  {
    id: "word-embeddings",
    label: "Word Embeddings &amp; Word2Vec",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What are word embeddings?", back: "Dense vector representations of words where similar words have similar vectors (high dot product). Capture semantic relationships in a compact space unlike one-hot vectors." },
    { front: "What is the one-hot representation and why is it insufficient?", back: "A vector of size |vocabulary| with a single 1 at the word's index. No notion of similarity between words and very high-dimensional for large vocabularies." },
    { front: "How does Word2Vec learn embeddings?", back: "Given center word w_t, predict surrounding context words in a window. Each word has a center vector v and context vector u. Probability of context word = softmax(u dot v). Training maximizes likelihood of observed context pairs." },
    { front: "What is distributional semantics?", back: "Words appearing in similar contexts have similar meanings. Embeddings trained on co-occurrence patterns capture this automatically: 'king' and 'queen' end up nearby because they appear in similar contexts." }
    ],
  },
  {
    id: "nlp-models",
    label: "Language Models (n-gram, Perplexity)",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is a language model?", back: "A probabilistic model that assigns probabilities to word sequences. Can compute probability of a sentence or predict the next word given context. Used for generation, translation, summarization." },
    { front: "What is the Markov assumption in n-gram models?", back: "Probability of a word depends only on the previous k = n-1 words, not the full history. Simplifies estimation at the cost of ignoring longer context." },
    { front: "What is the difference between unigram and bigram models?", back: "Unigram (k=0): full independence, probability based on word frequency alone. Bigram (k=1): probability depends on the immediately preceding word. Higher n means more expressiveness but harder to estimate." },
    { front: "How are n-gram probabilities trained?", back: "Count occurrences in training data. Use log probabilities to avoid multiplying tiny numbers. For zero-count n-grams, apply Laplace smoothing: add 1 to numerator and V (vocabulary size) to denominator." },
    { front: "What is perplexity?", back: "PP(W) = P(w1,...,wn)^(-1/n). Measures average uncertainty per word. Lower perplexity = better model. Evaluated on test data." },
    { front: "What is the difference between extrinsic and intrinsic evaluation?", back: "Extrinsic: use the model on a downstream task and measure accuracy, slow but realistic. Intrinsic: measure quality directly via perplexity, fast but may not reflect real task performance." }
    ],
  },
  {
    id: "clustering",
    label: "Clustering (K-Means, Hierarchical, Spectral)",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is clustering?", back: "Grouping data so points within a cluster are similar and points across clusters are dissimilar. Unsupervised, no labels required." },
    { front: "How does K-means work?", back: "Pick k random centers. Assign each point to the nearest center. Recompute centers as the mean of assigned points. Repeat until centers stop moving. Minimizes within-cluster sum of squares." },
    { front: "Does K-means guarantee the global optimum?", back: "No, it converges to a local optimum depending on initialization. Run multiple times with different random seeds and keep the best result." },
    { front: "Does K-means always terminate?", back: "Yes. There are finitely many possible assignments for a fixed dataset and k. Each iteration reduces or maintains the objective, so it must converge." },
    { front: "How do you choose k for K-means?", back: "Elbow method: plot within-cluster sum of squares vs. k. The elbow point where reduction slows suggests the right k. Domain knowledge is also needed." },
    { front: "What is hierarchical agglomerative clustering?", back: "Start with each point as its own cluster. Repeatedly merge the two closest clusters. Linkage criteria: single (min distance), complete (max distance), average. No need to specify k upfront." },
    { front: "What is spectral clustering?", back: "Build a graph Laplacian L = D - A. Compute the k smallest eigenvectors, form an n x k matrix, run K-means on its rows. Handles non-convex clusters and only needs a similarity matrix, not coordinates." },
    { front: "Why use a normalized Laplacian for spectral clustering?", back: "Unnormalized cuts can isolate single nodes. Dividing by volume (sum of degrees per cluster) enforces balanced cuts where each cluster has substantial connectivity." },
    { front: "What is T-SNE?", back: "A visualization algorithm projecting high-dimensional data into 2D while preserving neighborhood structure. Uses Gaussian probabilities in high dimensions and Student-t in low dimensions. Better for cluster visualization than PCA." },
    { front: "What is Kernel Density Estimation?", back: "Estimates an underlying probability distribution from samples by placing a kernel function (e.g., Gaussian) at each point and summing. Bandwidth h controls smoothness. Continuous alternative to histograms." }
    ],
  },
  {
    id: "pca",
    label: "PCA &amp; Dimensionality Reduction",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is PCA?", back: "Principal Component Analysis: an unsupervised algorithm that finds the directions of maximum variance in data. Projects data onto these directions to reduce dimensionality while retaining the most information." },
    { front: "How does PCA relate to the covariance matrix?", back: "PCA computes eigenvectors of the data's covariance matrix. Eigenvectors with the largest eigenvalues capture the most variance and become the principal components." },
    { front: "What is PCA used for?", back: "Dimensionality reduction (compress high-dimensional data), visualization (project to 2D or 3D), and noise reduction. It is an unsupervised method with no labels required." },
    { front: "How does PCA differ from spectral clustering?", back: "PCA uses the covariance matrix and takes the largest eigenvectors to capture variance. Spectral clustering uses the Laplacian matrix and takes the smallest eigenvectors to find graph partitions." }
    ],
  },
  {
    id: "rl",
    label: "Reinforcement Learning &amp; Q-Learning",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is the reinforcement learning loop?", back: "Agent takes action. World returns new state and reward. Agent updates strategy. Repeat. Goal: find a state-to-action mapping that maximizes cumulative reward." },
    { front: "How does Q-learning work?", back: "Learns Q*(s,a), the expected value of taking action a in state s, from experience without knowing the transition model. Update: Q(s,a) = (1-alpha)*Q(s,a) + alpha*(r + gamma * max Q(s', a'))." },
    { front: "How does Q-learning differ from value iteration?", back: "Value iteration is a planning algorithm requiring known transition probabilities and reward function. Q-learning discovers Q-values from trial-and-error interaction with no model." },
    { front: "What is the exploration-exploitation trade-off?", back: "Exploitation: take the action with the highest known Q-value. Exploration: try uncertain actions to improve estimates. Epsilon-greedy: explore with probability epsilon, exploit otherwise." },
    { front: "What is an episode in Q-learning?", back: "A sequence from an initial state to a terminal state. The agent runs many episodes. Q-values converge as more episodes provide more samples of the environment." },
    { front: "How are terminal states handled in Q-learning?", back: "Q(s_terminal) = 0. When a step leads into a terminal state, the future reward term is 0 because there is no next state to evaluate." }
    ],
  },
  {
    id: "mdp",
    label: "Markov Decision Processes",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What defines a Markov Decision Process?", back: "States S, Actions A, transition model P(s'|s,a), reward function r(s), and initial state s0. The Markov property: next state depends only on the current state and action, not the history." },
    { front: "What is a policy?", back: "A function pi(s) mapping each state to an action. The optimal policy pi* maximizes expected cumulative discounted reward." },
    { front: "Why is reward discounting used?", back: "Without discounting, infinite sequences produce infinite rewards causing math to break down. Discount factor gamma < 1 controls the trade-off: small gamma is myopic, large gamma is farsighted." },
    { front: "What is the Bellman equation?", back: "V*(s) = r(s) + gamma * max_a * sum_{s'} P(s'|s,a) * V*(s'). Decomposes state value into immediate reward plus discounted expected value of the best next state." },
    { front: "How does value iteration work?", back: "Start with V0(s) = 0. Repeatedly apply the Bellman update until values converge. Requires knowing P and r (planning algorithm, not learning)." }
    ],
  },
  {
    id: "logic-ai",
    label: "Propositional &amp; First-Order Logic",
    group: "ai",
    groupLabel: "AI & Machine Learning",
    courses: ["CS 540"],
    cards: [
    { front: "What is the difference between validity and soundness?", back: "Valid: if all premises are true the conclusion must be true. Sound: valid AND all premises are actually true. Soundness implies validity but not vice versa." },
    { front: "What is entailment?", back: "A entails B (A |= B) means whenever A is true, B must also be true. B logically follows from A." },
    { front: "What is a knowledge base?", back: "A set of sentences connected by conjunction. A model of the KB is an interpretation where all sentences are true. The goal is inference: derive new entailed sentences." },
    { front: "What are the three methods of inference?", back: "Enumeration: truth table over all 2^n interpretations. Rules: apply logical equivalences and modus ponens. Resolution: convert to CNF and apply the resolution rule." },
    { front: "How does resolution inference work?", back: "Convert all sentences to CNF (conjunction of clauses, each a disjunction of literals). From (L or A) and (not L or B), derive (A or B). To prove KB |= beta: add not-beta and derive the empty clause." },
    { front: "What does First-Order Logic add over propositional logic?", back: "Objects (constants, variables, functions), relations (predicates mapping objects to truth values), and quantifiers (for-all and there-exists). Enables statements like 'all squares have 4 sides'." },
    { front: "What is the difference between a term, atom, and sentence in FOL?", back: "Term: an object (constant, variable, or function of terms). Atom: smallest true/false unit, a predicate applied to terms. Sentence: an atom or atoms combined with connectives and quantifiers." }
    ],
  },
];

export interface FlatCard extends FlashCard {
  conceptId: string;
  conceptLabel: string;
  group: string;
  groupLabel: string;
  courses: string[];
}

export const ALL_FLAT_CARDS: FlatCard[] = ALL_DECKS.flatMap(d =>
  d.cards.map(c => ({
    ...c,
    conceptId: d.id,
    conceptLabel: d.label,
    group: d.group,
    groupLabel: d.groupLabel,
    courses: d.courses,
  }))
);

export const TOTAL_CARDS = ALL_FLAT_CARDS.length;