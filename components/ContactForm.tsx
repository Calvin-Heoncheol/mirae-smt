'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="rounded-2xl bg-white border border-ink-100 p-6 md:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-ink-900">{t('title')}</h3>
      <p className="mt-1.5 text-sm text-ink-500">{t('subtitle')}</p>

      {status === 'success' && (
        <div className="mt-5 flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-emerald-900">
              {t('successTitle')}
            </div>
            <div className="mt-0.5 text-sm text-emerald-700">
              {t('successMessage')}
            </div>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="mt-5 flex gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4">
          <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-rose-900">
              {t('errorTitle')}
            </div>
            <div className="mt-0.5 text-sm text-rose-700">
              {t('errorMessage')}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field name="name" label={t('name')} required />
        <Field name="company" label={t('company')} />
        <Field name="email" label={t('email')} type="email" required />
        <Field name="phone" label={t('phone')} />
        <Field name="subject" label={t('subject')} required className="md:col-span-2" />
        <Field
          name="message"
          label={t('message')}
          placeholder={t('messagePlaceholder')}
          required
          textarea
          className="md:col-span-2"
        />

        <div className="md:col-span-2 mt-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className={clsx(
              'btn-primary w-full md:w-auto',
              status === 'submitting' && 'opacity-70 cursor-not-allowed',
            )}
          >
            {status === 'submitting' ? t('submitting') : t('submit')}
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required,
  placeholder,
  textarea,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  className?: string;
}) {
  const base =
    'mt-1.5 w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition';
  return (
    <label className={clsx('block', className)}>
      <span className="text-sm font-semibold text-ink-800">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={6}
          className={clsx(base, 'resize-y')}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={base}
        />
      )}
    </label>
  );
}
