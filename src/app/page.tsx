"use client";
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link'

// Benzersiz ID'ler ile başlangıç tahtası
const initialBoard = [
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  ['R1', 'N1', 'B1', 'Q', 'K', 'B2', 'N2', 'R2'], // Beyaz taşlar
];

export default function Home() {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState<{row: number, col: number} | null>(null);
  const [coloredSquares, setColoredSquares] = useState<{
    pieceId: string;
    squares: {row: number, col: number}[];
  }[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);

  // Tahtanın tamamen boyanıp boyanmadığını kontrol et
  const checkGameCompletion = (squares: {pieceId: string, squares: {row: number, col: number}[]}[]) => {
    const allColoredSquares = new Set();
    squares.forEach(piece => {
      piece.squares.forEach(square => {
        allColoredSquares.add(`${square.row}-${square.col}`);
      });
    });
    // 64 kare (8x8 tahta)
    if (allColoredSquares.size === 64) {
      setIsGameComplete(true);
    }
  };

  const getPieceImage = (pieceId: string) => {
    const pieceType = pieceId.charAt(0).toLowerCase();
    const isWhite = pieceId.charAt(0) === pieceId.charAt(0).toUpperCase();
    const pieceImages: {[key: string]: string} = {
      'r': isWhite ? '/white-rook.png' : '/black-rook.png',
      'n': isWhite ? '/white-knight.png' : '/black-knight.png',
      'b': isWhite ? '/white-bishop.png' : '/black-bishop.png',
      'q': isWhite ? '/white-queen.png' : '/black-queen.png',
      'k': isWhite ? '/white-king.png' : '/black-king.png',
    };
    return pieceImages[pieceType];
  };

  const calculateColoredSquares = (piece: string, row: number, col: number) => {
    const squares: {row: number, col: number}[] = [];

    switch(piece.toLowerCase()) {
      case 'r': // Kale
        // Tüm dikey kareler
        for (let i = 0; i < 8; i++) {
          if (i !== row) squares.push({row: i, col});
        }
        // Tüm yatay kareler
        for (let j = 0; j < 8; j++) {
          if (j !== col) squares.push({row, col: j});
        }
        break;

      case 'b': // Fil
        // Tüm çapraz kareler
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (Math.abs(row - i) === Math.abs(col - j) && (i !== row || j !== col)) {
              squares.push({row: i, col: j});
            }
          }
        }
        break;

      case 'n': // At
        const knightMoves = [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        knightMoves.forEach(([drow, dcol]) => {
          const newRow = row + drow;
          const newCol = col + dcol;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            squares.push({row: newRow, col: newCol});
          }
        });
        break;

      case 'q': // Vezir
        // Kale hareketleri
        for (let i = 0; i < 8; i++) {
          if (i !== row) squares.push({row: i, col});
          if (i !== col) squares.push({row, col: i});
        }
        // Fil hareketleri
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (Math.abs(row - i) === Math.abs(col - j) && (i !== row || j !== col)) {
              squares.push({row: i, col: j});
            }
          }
        }
        break;

      case 'k': // Şah
        const kingMoves = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1],  [1, 0],  [1, 1]
        ];
        kingMoves.forEach(([drow, dcol]) => {
          const newRow = row + drow;
          const newCol = col + dcol;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            squares.push({row: newRow, col: newCol});
          }
        });
        break;

      case 'p': // Piyon
        // Beyaz piyon
        if (piece === 'P') {
          squares.push({row: row - 1, col: col - 1});
          squares.push({row: row - 1, col: col + 1});
        }
        // Siyah piyon
        else {
          squares.push({row: row + 1, col: col - 1});
          squares.push({row: row + 1, col: col + 1});
        }
        break;
    }
    return squares;
  };

  const handlePieceClick = (row: number, col: number) => {
    if (isGameComplete) return; // Oyun bittiyse tıklamaları engelle

    if (!isMoving && board[row][col] !== '') {
      setSelectedPiece({ row, col });
      setIsMoving(true);
    } else if (isMoving && selectedPiece) {
      if (board[row][col] === '') {
        const movingPieceId = board[selectedPiece.row][selectedPiece.col];
        
        const newBoard = [...board.map(row => [...row])];
        newBoard[row][col] = movingPieceId;
        newBoard[selectedPiece.row][selectedPiece.col] = '';
        setBoard(newBoard);

        const newSquares = calculateColoredSquares(movingPieceId.charAt(0), row, col);
        const updatedColoredSquares = coloredSquares.filter(p => p.pieceId !== movingPieceId);
        const newColoredSquares = [...updatedColoredSquares, { 
          pieceId: movingPieceId, 
          squares: newSquares 
        }];
        
        setColoredSquares(newColoredSquares);
        checkGameCompletion(newColoredSquares);
        
        // Taşı yeni konumunda seçili tutmak için
        setSelectedPiece({ row, col });
      } else {
        // Eğer başka bir taşa tıklanırsa, yeni taşı seç
        setSelectedPiece({ row, col });
      }
    }
  };

  const isSquareColored = (row: number, col: number) => {
    return coloredSquares.some(pieceSquares => 
      pieceSquares.squares.some(square => 
        square.row === row && square.col === col
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Başlık */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Satranç Boyama Oyunu
      </h1>

      {/* Satranç Tahtası - Responsive boyutlar */}
      <div className="grid grid-cols-8 w-full max-w-[400px] aspect-square border-2 border-gray-800">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isBlack = (rowIndex + colIndex) % 2 === 1;
            const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;
            const isColored = isSquareColored(rowIndex, colIndex);
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="relative cursor-pointer w-full h-full"
                onClick={() => handlePieceClick(rowIndex, colIndex)}
              >
                <div className={`absolute inset-0 ${
                  isBlack ? "bg-gray-100" : "bg-white"
                }`} />
                
                {isColored && (
                  <div className="absolute inset-0 bg-green-500/80 mix-blend-multiply" />
                )}
                
                {isSelected && (
                  <div className="absolute inset-0 ring-2 ring-blue-500" />
                )}
                
                {piece && (
                  <div className="relative w-full h-full">
                    <Image
                      src={getPieceImage(piece)}
                      alt={piece}
                      fill
                      className="object-contain p-1"
                      priority
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Oyun Tamamlandı Mesajı */}
      {isGameComplete && (
        <div className="mt-4 text-xl md:text-2xl font-bold text-green-600 text-center">
          Tebrikler! Tüm tahta boyandı!
        </div>
      )}

      {/* Butonlar - Mobile uyumlu */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm md:text-base"
          onClick={() => {
            setColoredSquares([]);
            setIsGameComplete(false);
          }}
        >
          Boyaları Temizle
        </button>
        <Link 
          href="/about" 
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-center text-sm md:text-base"
        >
          Hakkında
        </Link>
      </div>
    </div>
  );
}
