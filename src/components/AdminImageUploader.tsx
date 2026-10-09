'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { compressAndConvertToWebP, CompressionResult } from '../lib/imageCompressor';
import { UploadCloud, Check, Zap, Image as ImageIcon, Link as LinkIcon, Trash2 } from 'lucide-react';

interface AdminImageUploaderProps {
  value: string;
  onChange: (webpDataUrl: string) => void;
  label?: string;
}

export const AdminImageUploader: React.FC<AdminImageUploaderProps> = ({
  value,
  onChange,
  label = 'JERSEY PRODUCT IMAGE (AUTO COMPRESSED TO WEBP)',
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState<CompressionResult | null>(null);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, etc.)');
      return;
    }

    try {
      setIsProcessing(true);
      const res = await compressAndConvertToWebP(file, 1080, 1350, 0.82);
      setStats(res);
      onChange(res.dataUrl);
    } catch (err) {
      console.error('Image compression error:', err);
      alert('Failed to compress image. Please try another file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#a1a1aa', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
          <ImageIcon size={13} color="#ffffff" />
          <span>{label}</span>
        </label>

        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button
            type="button"
            onClick={() => setMode('upload')}
            style={{
              background: mode === 'upload' ? '#ffffff' : 'transparent',
              color: mode === 'upload' ? '#000000' : '#71717a',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '0.2rem 0.5rem',
              fontSize: '0.65rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              borderRadius: '2px',
            }}
          >
            Upload & WebP
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            style={{
              background: mode === 'url' ? '#ffffff' : 'transparent',
              color: mode === 'url' ? '#000000' : '#71717a',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '0.2rem 0.5rem',
              fontSize: '0.65rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              borderRadius: '2px',
            }}
          >
            Image URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: isDragging ? '2px dashed #ffffff' : '1px dashed rgba(255, 255, 255, 0.25)',
              background: isDragging ? 'rgba(255, 255, 255, 0.08)' : '#07090e',
              padding: '1.5rem',
              borderRadius: '6px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <UploadCloud size={20} />
            </div>

            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                {isProcessing ? 'COMPRESSING & CONVERTING TO WEBP...' : 'Click to Upload or Drag & Drop Image'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#71717a', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                Auto downscaled to ideal 1080px e-commerce ratio & converted to WebP for instant load times
              </div>
            </div>
          </div>

          {/* Live WebP Compression Stats & Preview */}
          {value && (
            <div
              style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                background: '#040507',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '50px',
                    height: '60px',
                    overflow: 'hidden',
                    background: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    flexShrink: 0,
                  }}
                >
                  <Image src={value} alt="Preview" fill style={{ objectFit: 'cover' }} unoptimized={value.startsWith('data:')} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 700, color: '#22c55e', fontFamily: 'var(--font-mono)' }}>
                    <Zap size={13} fill="#22c55e" />
                    <span>OPTIMIZED WEBP READY</span>
                  </div>

                  {stats ? (
                    <div style={{ fontSize: '0.68rem', color: '#a1a1aa', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                      Original: {stats.originalSizeKB} KB ➔ Compressed WebP: <strong style={{ color: '#ffffff' }}>{stats.compressedSizeKB} KB</strong> ({stats.savingsPercent}% reduced, {stats.width}x{stats.height}px)
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.68rem', color: '#71717a', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                      WebP image loaded and ready for store catalog.
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setStats(null);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#f87171',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <Trash2 size={13} />
                <span>Remove</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* URL Input Mode */
        <div>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="form-input"
            style={{ height: '42px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
          />
        </div>
      )}
    </div>
  );
};
