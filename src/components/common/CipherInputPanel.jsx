import React from 'react';
import Card from './Card';
import Button from './Button';
import { TextArea, Label } from './Inputs';

const CipherInputPanel = ({ 
    title, 
    text, 
    setText, 
    onEncrypt, 
    onDecrypt, 
    disableActions = false, 
    children // specific configs (like Shift or Matrix inputs)
}) => {
  return (
    <Card title={title}>
        {/* Specific Config Inputs */}
        {children && <div className="mb-6">{children}</div>}

        {/* Standard Message Input */}
        <div className="mb-6">
            <Label>Message</Label>
            <TextArea 
                value={text} 
                onChange={e => setText(e.target.value)} 
                placeholder="Enter message to process..." 
            />
        </div>

        {/* Standard Action Buttons */}
        <div className="flex gap-3">
            <Button onClick={onEncrypt} disabled={disableActions} className="flex-1">
                Encrypt
            </Button>
            <Button onClick={onDecrypt} disabled={disableActions} variant="secondary" className="flex-1">
                Decrypt
            </Button>
        </div>
    </Card>
  );
};

export default CipherInputPanel;
