import * as React from 'react';
import {
  Multiselect,
  Button,
  SpaceBetween,
} from '@cloudscape-design/components';

export function SelectScopes({
  selectedScopeOptions,
  setSelectedScopeOptions,
}) {
  const scopes = [
    { label: 'wallet:accounts:read', value: 'wallet:accounts:read' },
    { label: 'wallet:accounts:update', value: 'wallet:accounts:update' },
    { label: 'wallet:accounts:create', value: 'wallet:accounts:create' },
    { label: 'wallet:accounts:delete', value: 'wallet:accounts:delete' },
    { label: 'wallet:addresses:read', value: 'wallet:addresses:read' },
    { label: 'wallet:addresses:create', value: 'wallet:addresses:create' },
    { label: 'wallet:buys:read', value: 'wallet:buys:read' },
    { label: 'wallet:buys:create', value: 'wallet:buys:create' },
    { label: 'wallet:deposits:read', value: 'wallet:deposits:read' },
    { label: 'wallet:deposits:create', value: 'wallet:deposits:create' },
    { label: 'wallet:notifications:read', value: 'wallet:notifications:read' },
    { label: 'wallet:user:read', value: 'wallet:user:read' },
    { label: 'wallet:user:update', value: 'wallet:user:update' },
    { label: 'wallet:withdrawals:read', value: 'wallet:withdrawals:read' },
    { label: 'wallet:withdrawals:create', value: 'wallet:withdrawals:create' },
    {
      label: 'wallet:payment-methods:read',
      value: 'wallet:payment-methods:read',
    },
    {
      label: 'wallet:payment-methods:delete',
      value: 'wallet:payment-methods:delete',
    },
    {
      label: 'wallet:payment-methods:limits',
      value: 'wallet:payment-methods:limits',
    },
  ];

  const handleSelectAll = () => {
    const allValues = scopes.map((scope) => scope);
    console.log(allValues);
    setSelectedScopeOptions(allValues);
  };

  const handleClearSelection = () => {
    setSelectedScopeOptions([]);
  };

  console.log(selectedScopeOptions);
  return (
    <div>
      <Multiselect
        label="Select Scopes"
        placeholder="Choose Scope options"
        selectedOptions={selectedScopeOptions}
        options={scopes}
        onChange={({ detail }) =>
          setSelectedScopeOptions(detail.selectedOptions)
        }
        value={selectedScopeOptions}
        expandToViewport
        autoFocus
      />
      <br />
      <div>
        <SpaceBetween direction="horizantal" size="xs">
          <Button onClick={handleSelectAll}>Select All</Button>
          <Button onClick={handleClearSelection}>Clear Selection</Button>
        </SpaceBetween>
      </div>
    </div>
  );
}
