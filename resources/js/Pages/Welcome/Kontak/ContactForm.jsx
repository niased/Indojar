import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ContactForm({ t, lang, isDark }) {
    const [form, setForm] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const mailSubject =
            form.subject.trim() ||
            (lang === 'id'
                ? 'Pertanyaan Proyek PT Indojar Mulia Abadi'
                : 'Project Inquiry - PT Indojar Mulia Abadi');

        const mailBody = [
            `${t.form.name}: ${form.name}`,
            `${t.form.company}: ${form.company}`,
            `${t.form.email}: ${form.email}`,
            `${t.form.phone}: ${form.phone}`,
            '',
            `${t.form.subject}: ${form.subject}`,
            '',
            form.message,
        ].join('\n');

        const mailto = `mailto:info@indojar.com?subject=${encodeURIComponent(
            mailSubject,
        )}&body=${encodeURIComponent(mailBody)}`;

        setSubmitted(true);
        window.location.href = mailto;
    };

    return (
        <section
            className={`
                border-b
                ${
                    isDark
                        ? 'border-white/10 bg-[#031a14]'
                        : 'border-[#d9dfda] bg-[#f7f6f1]'
                }
            `}
        >
            <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
                <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
                    {/* LEFT */}
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-[#d5ad59]" />

                            <span
                                className={`
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.22em]
                                    ${
                                        isDark
                                            ? 'text-white/55'
                                            : 'text-[#0b7544]/70'
                                    }
                                `}
                            >
                                {t.form.eyebrow}
                            </span>
                        </div>

                        <h2
                            className={`
                                mt-5
                                max-w-xl
                                text-3xl
                                font-semibold
                                leading-tight
                                tracking-[-0.03em]
                                sm:text-4xl
                                lg:text-5xl
                                ${
                                    isDark
                                        ? 'text-white'
                                        : 'text-[#10231c]'
                                }
                            `}
                        >
                            {t.form.title}
                        </h2>

                        <p
                            className={`
                                mt-6
                                max-w-lg
                                text-base
                                leading-7
                                ${
                                    isDark
                                        ? 'text-white/55'
                                        : 'text-[#10231c]/60'
                                }
                            `}
                        >
                            {t.form.description}
                        </p>

                        <div className="mt-10 border-l-2 border-[#d5ad59] pl-5">
                            <p
                                className={`
                                    text-sm
                                    font-semibold
                                    ${
                                        isDark
                                            ? 'text-white'
                                            : 'text-[#10231c]'
                                    }
                                `}
                            >
                                {t.note.title}
                            </p>

                            <p
                                className={`
                                    mt-2
                                    max-w-md
                                    text-sm
                                    leading-6
                                    ${
                                        isDark
                                            ? 'text-white/45'
                                            : 'text-[#10231c]/55'
                                    }
                                `}
                            >
                                {t.note.text}
                            </p>
                        </div>
                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className={`
                            border
                            p-6
                            sm:p-8
                            lg:p-10
                            ${
                                isDark
                                    ? 'border-white/10 bg-white/[0.025]'
                                    : 'border-[#d8dfda] bg-white'
                            }
                        `}
                    >
                        <div className="grid gap-6 md:grid-cols-2">
                            <Field
                                label={t.form.name}
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                dark={isDark}
                            />

                            <Field
                                label={t.form.company}
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                dark={isDark}
                            />

                            <Field
                                label={t.form.email}
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                dark={isDark}
                            />

                            <Field
                                label={t.form.phone}
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                dark={isDark}
                            />

                            <div className="md:col-span-2">
                                <Field
                                    label={t.form.subject}
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder={t.form.subjectPlaceholder}
                                    required
                                    dark={isDark}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label
                                    className={`
                                        block
                                        text-[11px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.16em]
                                        ${
                                            isDark
                                                ? 'text-white/55'
                                                : 'text-[#10231c]/60'
                                        }
                                    `}
                                >
                                    {t.form.message}

                                    <span className="ml-1 text-[#d5ad59]">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    name="message"
                                    rows={7}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    placeholder={t.form.messagePlaceholder}
                                    className={`
                                        mt-3
                                        w-full
                                        resize-none
                                        border
                                        px-4
                                        py-3
                                        text-sm
                                        outline-none
                                        transition
                                        ${
                                            isDark
                                                ? 'border-white/10 bg-white/[0.025] text-white placeholder:text-white/20 focus:border-[#d5ad59]/70'
                                                : 'border-[#d8dfda] bg-[#fbfbf8] text-[#10231c] placeholder:text-[#10231c]/25 focus:border-[#087a48]'
                                        }
                                    `}
                                />
                            </div>
                        </div>

                        {submitted && (
                            <div
                                className={`
                                    mt-6
                                    border-l-2
                                    border-[#d5ad59]
                                    pl-4
                                    ${
                                        isDark
                                            ? 'text-white/65'
                                            : 'text-[#10231c]/65'
                                    }
                                `}
                            >
                                <p className="text-sm font-semibold">
                                    {t.success.title}
                                </p>

                                <p className="mt-1 text-sm leading-6">
                                    {t.success.text}
                                </p>
                            </div>
                        )}

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <span
                                className={`
                                    text-[11px]
                                    ${
                                        isDark
                                            ? 'text-white/25'
                                            : 'text-[#10231c]/35'
                                    }
                                `}
                            >
                                * {t.form.required}
                            </span>

                            <button
                                type="submit"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-3
                                    bg-[#0b7544]
                                    px-6
                                    py-3.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-[#08633a]
                                "
                            >
                                {submitted
                                    ? t.form.sending
                                    : t.form.submit}

                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

function Field({
    label,
    name,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    required = false,
    dark = false,
}) {
    return (
        <div>
            <label
                className={`
                    block
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    ${
                        dark
                            ? 'text-white/55'
                            : 'text-[#10231c]/60'
                    }
                `}
            >
                {label}

                {required && (
                    <span className="ml-1 text-[#d5ad59]">*</span>
                )}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`
                    mt-3
                    w-full
                    border
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    ${
                        dark
                            ? 'border-white/10 bg-white/[0.025] text-white placeholder:text-white/20 focus:border-[#d5ad59]/70'
                            : 'border-[#d8dfda] bg-[#fbfbf8] text-[#10231c] placeholder:text-[#10231c]/25 focus:border-[#087a48]'
                    }
                `}
            />
        </div>
    );
}