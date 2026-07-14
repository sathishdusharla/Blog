import React, { useState, useRef } from 'react';
import { Send, Play, CheckCircle2 } from 'lucide-react';
import './TerminalContact.css';

export const TerminalContact: React.FC = () => {
  const [formMode, setFormMode] = useState<'gui' | 'cli'>('gui');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [cliInput, setCliInput] = useState('');
  const [cliLogs, setCliLogs] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const cliInputRef = useRef<HTMLInputElement>(null);

  const handleGuiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.message.trim()) newErrors.message = 'Message body cannot be empty';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 4000);
  };

  const handleCliCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCliLogs((prev) => [...prev, `λ guest@devlog:~$ ${trimmed}`]);
    setCliInput('');

    // Parse parameters from: send-message --name "John" --email "john@example.com" --body "hello there"
    const commandPattern = /^send-message\s+--name\s+"([^"]+)"\s+--email\s+"([^"]+)"\s+--body\s+"([^"]+)"$/i;
    const match = trimmed.match(commandPattern);

    if (trimmed === 'help') {
      setCliLogs((prev) => [
        ...prev,
        'Available CLI Form Commands:',
        '  help                                                                   Display helper details',
        '  clear                                                                  Clear screen logs',
        '  send-message --name "NAME" --email "EMAIL" --body "MESSAGE"           Send contact message packet',
        '  Example: send-message --name "Alice" --email "alice@net.io" --body "Hi Sathish!"'
      ]);
      return;
    }

    if (trimmed === 'clear') {
      setCliLogs([]);
      return;
    }

    if (match) {
      const [, name, email, body] = match;
      
      // Simple email match
      if (!/\S+@\S+\.\S+/.test(email)) {
        setCliLogs((prev) => [
          ...prev,
          'ERROR [CODE 400]: Malformed email token. Please review "--email" argument.'
        ]);
        return;
      }

      setCliLogs((prev) => [
        ...prev,
        `Parsing tokens... OK`,
        `Payload Source: Name = "${name}" | Email = "${email}"`,
        `Payload Contents: "${body}"`,
        `Sending connection packets to SD_DEVLOG HQ...`,
        `STATUS: MESSAGE PACKET ROUTED SUCCESSFULLY! Thank you, ${name}.`
      ]);
    } else {
      setCliLogs((prev) => [
        ...prev,
        'CRITICAL: Syntax error in command input.',
        'Usage: send-message --name "NAME" --email "EMAIL" --body "MESSAGE"',
        'Note: Parameters must be wrapped in double quotes ("). Type "help" for a template.'
      ]);
    }
  };

  const handleCliKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCliCommand(cliInput);
    }
  };

  return (
    <section className="contact-section">
      <div className="section-header">
        <h2 className="text-gradient-cyan-purple">Get in touch</h2>
        <p className="section-subtitle">
          Have an exciting project, a role openings, or a technical inquiry? Send a packet this way.
        </p>
      </div>

      <div className="contact-container glass-card">
        {/* Toggle Mode headers */}
        <div className="contact-mode-toggle">
          <button 
            className={`toggle-btn ${formMode === 'gui' ? 'active' : ''}`}
            onClick={() => setFormMode('gui')}
          >
            Graphical UI
          </button>
          <button 
            className={`toggle-btn ${formMode === 'cli' ? 'active' : ''}`}
            onClick={() => setFormMode('cli')}
          >
            Developer Console CLI
          </button>
        </div>

        {/* GUI Form Mode */}
        {formMode === 'gui' && (
          <div className="gui-form-wrap">
            {isSubmitted ? (
              <div className="success-screen flex-center animate-fade-in">
                <CheckCircle2 size={48} className="success-check" />
                <h3>Transmission Successful</h3>
                <p>Message packet has been routed to HQ. Sathish will reply shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleGuiSubmit} className="gui-form" noValidate>
                <div className="form-group">
                  <label htmlFor="form-name">Name</label>
                  <input
                    id="form-name"
                    type="text"
                    className={`form-input ${errors.name ? 'invalid' : ''}`}
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <span className="input-err-msg">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="form-email">Email</label>
                  <input
                    id="form-email"
                    type="email"
                    className={`form-input ${errors.email ? 'invalid' : ''}`}
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <span className="input-err-msg">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="form-message">Message Packet</label>
                  <textarea
                    id="form-message"
                    className={`form-input textarea-input ${errors.message ? 'invalid' : ''}`}
                    placeholder="Write your transmission contents..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  {errors.message && <span className="input-err-msg">{errors.message}</span>}
                </div>

                <button type="submit" className="form-submit-btn text-gradient-cyan-purple flex-center">
                  <Send size={16} />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* CLI Terminal Form Mode */}
        {formMode === 'cli' && (
          <div className="cli-form-wrap" onClick={() => cliInputRef.current?.focus()}>
            <div className="cli-terminal-header">
              <span className="cli-term-badge">CONTACT SHELL</span>
              <span className="cli-term-hint">Type "help" to view usage syntax</span>
            </div>
            
            <div className="cli-logs-container">
               <p className="cli-welcome-line">SD_DEVLOG Contact Shell. Initialize channel connection...</p>
              <p className="cli-welcome-line">Type: send-message --name "NAME" --email "EMAIL" --body "MESSAGE"</p>
              <p className="welcome-divider">========================================================</p>
              
              {cliLogs.map((log, idx) => (
                <pre key={idx} className={`cli-log-line ${log.startsWith('ERROR') ? 'log-err' : log.startsWith('STATUS') ? 'log-ok' : ''}`}>
                  {log}
                </pre>
              ))}
            </div>

            <div className="cli-input-row">
              <span className="cli-prompt">λ contact:~$</span>
              <input
                ref={cliInputRef}
                type="text"
                className="cli-input-field"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                onKeyDown={handleCliKeyDown}
                autoFocus
                placeholder="type command here..."
              />
              <button 
                className="cli-run-btn"
                onClick={() => handleCliCommand(cliInput)}
                aria-label="Run command"
              >
                <Play size={12} fill="currentColor" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default TerminalContact;
