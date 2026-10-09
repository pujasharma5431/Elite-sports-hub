'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Database, CheckCircle2, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';

export const SanityConnectModal: React.FC = () => {
  const { isSanityModalOpen, setIsSanityModalOpen, sanityConfig, saveSanityConfig } = useStore();

  const [projectId, setProjectId] = useState(sanityConfig.projectId || '');
  const [dataset, setDataset] = useState(sanityConfig.dataset || 'production');
  const [token, setToken] = useState(sanityConfig.token || '');
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; error?: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isSanityModalOpen) return null;

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId.trim()) {
      setFeedback({ text: 'Please enter a valid Sanity Project ID', error: true });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const success = await saveSanityConfig({
      projectId: projectId.trim(),
      dataset: dataset.trim() || 'production',
      token: token.trim(),
    });

    setIsSaving(false);
    if (success) {
      setFeedback({
        text: `Connected to Sanity project "${projectId}"! Real-time jerseys sync enabled.`,
      });
    } else {
      setFeedback({
        text: 'Could not connect to Sanity. Check your Project ID and CORS permissions on sanity.io/manage.',
        error: true,
      });
    }
  };

  const copyEnvSnippet = () => {
    const snippet = `NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId || 'your_project_id'}\nNEXT_PUBLIC_SANITY_DATASET=${dataset || 'production'}\nNEXT_PUBLIC_SANITY_API_VERSION=2024-03-01\nSANITY_API_TOKEN=${token}`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="sanity-connect-modal-overlay"
      className="modal-overlay"
      onClick={() => setIsSanityModalOpen(false)}
      style={{ zIndex: 140 }}
    >
      <div
        id="sanity-connect-modal-content"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '620px',
          padding: '2rem',
          background: '#050505',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
        }}
      >
        <button
          id="close-sanity-modal-btn"
          onClick={() => setIsSanityModalOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.1em' }}>
              // CMS INTEGRATION
            </div>
            <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.4rem', color: '#ffffff', textTransform: 'uppercase', marginTop: '0.2rem' }}>
              SANITY CMS CONNECTION
            </h2>
          </div>
        </div>

        {/* Connection Status Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1rem',
            background: '#0a0a0a',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {sanityConfig.isConnected ? (
              <CheckCircle2 size={16} color="#ffffff" />
            ) : (
              <AlertCircle size={16} color="#71717a" />
            )}
            <span style={{ color: '#ffffff', fontWeight: 700 }}>
              {sanityConfig.isConnected
                ? `ACTIVE PROJECT: ${sanityConfig.projectId}`
                : 'SANITY CMS: NOT CONFIGURED (USING INITIAL ARCHIVE)'}
            </span>
          </div>

          <a
            href="https://www.sanity.io/manage"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#a1a1aa',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              textDecoration: 'none',
            }}
          >
            <span>sanity.io/manage</span>
            <ExternalLink size={11} />
          </a>
        </div>

        {/* Form */}
        <form onSubmit={handleConnect} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
              PROJECT ID *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. cfa5sriy"
              className="form-input"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                DATASET
              </label>
              <input
                type="text"
                placeholder="production"
                className="form-input"
                value={dataset}
                onChange={(e) => setDataset(e.target.value)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                WRITE TOKEN (OPTIONAL)
              </label>
              <input
                type="password"
                placeholder="sk..."
                className="form-input"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          {feedback && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                padding: '0.65rem 0.85rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: '#090909',
                color: '#ffffff',
              }}
            >
              {feedback.text}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary"
              style={{ flex: 1, height: '44px', fontSize: '0.8rem', letterSpacing: '0.08em' }}
            >
              <Database size={15} />
              <span>{isSaving ? 'CONNECTING...' : 'SAVE & CONNECT SANITY'}</span>
            </button>

            <button
              type="button"
              onClick={copyEnvSnippet}
              className="btn btn-secondary"
              style={{ height: '44px', fontSize: '0.75rem' }}
            >
              {copied ? <Check size={14} color="#ffffff" /> : <Copy size={14} />}
              <span>{copied ? 'COPIED' : 'COPY .ENV'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
