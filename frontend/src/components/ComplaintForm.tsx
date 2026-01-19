'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { indianStates } from '../lib/states.js';
import { detectStateFromIssue } from '../lib/location.js';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';

export function ComplaintForm() {
  const [issueText, setIssueText] = useState('');
  const [state, setState] = useState('');
  const [showStateSelector, setShowStateSelector] = useState(false);
  const [stateGuidance, setStateGuidance] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText) {
      return;
    }

    // Manually selected state takes precedence.
    let finalState = state;
    if (!finalState) {
      finalState = detectStateFromIssue(issueText);
    }

    if (finalState) {
      const params = new URLSearchParams();
      params.append('state', finalState);
      if (issueText) {
        params.append('issue', issueText);
      }
      router.push(`/resolve?${params.toString()}`);
    } else {
      // If no state is selected or inferred, prompt the user to select one.
      setShowStateSelector(true);
      setStateGuidance(
        'Please select your state to find the correct government portal.'
      );
    }
  };

  const handleIssueTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setIssueText(e.target.value);
    // If the user modifies the issue text, hide the state selector
    // to allow for re-detection on the next submission.
    if (showStateSelector) {
      setShowStateSelector(false);
      setState(''); // Clear any manual selection
      setStateGuidance('');
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="issue-description">Describe your issue *</Label>
            <Textarea
              id="issue-description"
              placeholder="For example: 'My street light in Chennai is not working' or 'I need to report a water leak'"
              value={issueText}
              onChange={handleIssueTextChange}
              rows={4}
              required
            />
          </div>
          {showStateSelector && (
            <div className="space-y-2">
              <Label htmlFor="state-selector">State / UT</Label>
              <Select
                value={state}
                onValueChange={(value) => setState(value)}
                required={showStateSelector}
              >
                <SelectTrigger
                  id="state-selector"
                  aria-label="Select your state or union territory"
                  className="w-full"
                >
                  <SelectValue placeholder="Select your state / UT" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates
                    .filter(
                      (s) =>
                        s !== 'Not Found State' && s !== 'Server Error State'
                    )
                    .map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {stateGuidance && (
                <p className="pt-1 text-sm text-muted-foreground">
                  {stateGuidance}
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={!issueText || (showStateSelector && !state)}
          >
            Find the right government portal
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
