import { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  initialPosition?: Position;
}

export function useDraggable(options: UseDraggableOptions = {}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>(
    options.initialPosition || { x: 0, y: 0 }
  );
  
  const elementRef = useRef<HTMLDivElement>(null);
  const dragStartPositionRef = useRef<Position>({ x: 0, y: 0 });
  const initialClickOffsetRef = useRef<Position>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    
    setIsDragging(true);
    
    // Store the current element position
    dragStartPositionRef.current = { ...position };
    
    // Store the offset of the click relative to the element
    const rect = elementRef.current.getBoundingClientRect();
    initialClickOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // Calculate new position based on mouse movement
      setPosition({
        x: e.clientX - initialClickOffsetRef.current.x,
        y: e.clientY - initialClickOffsetRef.current.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return {
    elementRef,
    isDragging,
    position,
    handleMouseDown,
    setPosition
  };
}