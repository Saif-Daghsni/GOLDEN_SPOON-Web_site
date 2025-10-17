# Microprocessor Design (VHDL)

This project is a complete design and simulation of a **simple 16-bit microprocessor** with a **12-bit address bus**, implemented in **VHDL**.  
Built around the **Von Neumann architecture**, it demonstrates how a basic CPU fetches, decodes, and executes instructions — providing a clear understanding of computer architecture fundamentals.

---

## ⚙️ Key Features:

- **16-bit Data Bus & 12-bit Address Bus**: Supports up to 4096 memory locations.  
- **Von Neumann Architecture**: Unified memory for data and instructions.  
- **Simple Instruction Set**: Load, store, add, subtract, jump, and halt operations.  
- **5-State Finite State Machine (FSM)**: Manages instruction fetch, decode, and execution phases.  
- **ALU Operations**: Supports addition, subtraction, data transfer, and increment.  
- **Status Flags**: Zero and Sign flags for conditional jumps.  
- **Memory-Mapped I/O Ready**: Can be extended to include peripherals.  
- **Clean Modular Design**: Each component (PC, ALU, ACC, IR, Memory) designed as an independent block.  

---

## 💡 Sample Program

The included example program demonstrates:
- Arithmetic operations (`ADD`, `SUB`)  
- Conditional branching (`JGE`)  
- Looping until a condition fails  
- Data movement between memory and the accumulator  

---

## 🛠 Implementation Details

- **Language:** VHDL  
- **Simulation Tools:** ModelSim / Vivado  
- **Design Type:** Fully synchronous with clock and reset  
- **Control Unit:** FSM generating all control signals  
- **Timing:** Multi-cycle instruction execution  

---

## 📁 Un document explicatif

https://drive.google.com/file/d/1TaBTofcVBtfO3Bi3qF4Kcl5tt2nlj2Wc/view?usp=drivesdk

