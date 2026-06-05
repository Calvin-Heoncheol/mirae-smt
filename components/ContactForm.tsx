'use client';

import { useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const PRODUCT_TYPE_KEYS = ['smt', 'pcb', 'assembly', 'full', 'other'] as const;

const ALLOWED_FILE_TYPES = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'application/zip',
  'application/x-zip-compressed',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

const ALLOWED_FILE_EXTENSIONS = /\.(pdf|dwg|zip|png|jpe?g)$/i;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [clientError, setClientError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setClientError(null);
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('attachment');

    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        setClientError(t('fileTooLarge'));
        setStatus('error');
        return;
      }

      const isAllowedType =
        ALLOWED_FILE_TYPES.has(file.type) ||
        ALLOWED_FILE_EXTENSIONS.test(file.name);

      if (!isAllowedType) {
        setClientError(t('fileTypeInvalid'));
        setStatus('error');
        return;
      }
    } else {
      formData.delete('attachment');
    }

    formData.set('locale', locale);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!res.ok) {
        if (data?.error === 'Email service not configured') {
          setClientError(t('serviceNotConfigured'));
        } else if (data?.error === 'Email domain not verified') {
          setClientError(t('domainNotVerified'));
        } else {
          setClientError(null);
        }
        setStatus('error');
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setClientError(null);
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
      {(status === 'error' || clientError) && (
        <div className="mt-5 flex gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4">
          <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-rose-900">{t('errorTitle')}</div>
            <div className="mt-0.5 text-sm text-rose-700">
              {clientError ?? t('errorMessage')}
            </div>
          </div>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Field name="name" label={t('name')} required />
        <Field name="company" label={t('company')} />
        <Field name="email" label={t('email')} type="email" required />
        <Field name="phone" label={t('phone')} />

        <SelectField
          name="productType"
          label={t('productType')}
          placeholder={t('productTypePlaceholder')}
          className="md:col-span-2"
          options={PRODUCT_TYPE_KEYS.map((key) => ({
            value: key,
            label: t(`productTypes.${key}`),
          }))}
        />

        <Field
          name="quantity"
          label={t('quantity')}
          placeholder={t('quantityPlaceholder')}
        />
        <Field
          name="targetDelivery"
          label={t('targetDelivery')}
          placeholder={t('targetDeliveryPlaceholder')}
        />

        <FileField
          name="attachment"
          label={t('attachment')}
          hint={t('attachmentHint')}
          className="md:col-span-2"
        />

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

function SelectField({
  name,
  label,
  placeholder,
  options,
  required,
  className,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  required?: boolean;
  className?: string;
}) {
  const base =
    'mt-1.5 w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition';

  return (
    <label className={clsx('block', className)}>
      <span className="text-sm font-semibold text-ink-800">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </span>
      <select name={name} required={required} className={base} defaultValue="">
        <option value="" disabled={required}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function FileField({
  name,
  label,
  hint,
  className,
}: {
  name: string;
  label: string;
  hint: string;
  className?: string;
}) {
  const base =
    'mt-1.5 w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-brand-800 hover:file:bg-brand-100 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition';

  return (
    <label className={clsx('block', className)}>
      <span className="text-sm font-semibold text-ink-800">{label}</span>
      <input
        name={name}
        type="file"
        accept=".pdf,.dwg,.zip,.png,.jpg,.jpeg"
        className={base}
      />
      <span className="mt-1.5 block text-xs text-ink-500">{hint}</span>
    </label>
  );
}
