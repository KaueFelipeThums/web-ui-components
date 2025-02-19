import { forwardRef, ReactElement, ReactNode, useCallback, useEffect, useRef } from 'react';
import { BaseTabs, BaseTabsContent, BaseTabsList, BaseTabsTrigger } from '@/components/ui';
import { cn } from '@/lib/utils';

type TabsItemProps = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  content: ReactNode;
};

type TabsProps = React.ComponentProps<typeof BaseTabs> & {
  tabs: TabsItemProps[];
  onValueChange?: (value: string) => void;
  defaultValue: string;
  direction?: 'horizontal' | 'vertical';
  value?: string;
  scrollIntoView?: boolean;
  tabListContainerClassName?: string;
  tabListClassName?: string;
  tabTriggerClassName?: string;
  tabContentClassName?: string;
};

const Tabs = forwardRef<React.ComponentRef<typeof BaseTabs>, TabsProps>(
  (
    {
      tabs,
      direction = 'vertical',
      defaultValue,
      value,
      onValueChange,
      className = '',
      scrollIntoView = true,
      tabListContainerClassName,
      tabListClassName,
      tabTriggerClassName,
      tabContentClassName,
      ...props
    },
    ref,
  ): ReactElement => {
    const triggersRef = useRef<Record<string, HTMLButtonElement | null>>({});
    const tabListContainerRef = useRef<HTMLDivElement>(null);

    const scrollToSelectedTab = useCallback(
      (selectedValue: string) => {
        if (!scrollIntoView) return;

        const selectedTab = triggersRef.current[selectedValue];
        const container = tabListContainerRef.current;

        if (selectedTab && container) {
          const tabRect = selectedTab.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const isHorizontalList = direction === 'vertical';

          if (isHorizontalList) {
            const left = tabRect.left - containerRect.left + container.scrollLeft;
            const target = left - containerRect.width / 2 + tabRect.width / 2;
            container.scrollTo({ left: target, behavior: 'smooth' });
          } else {
            const top = tabRect.top - containerRect.top + container.scrollTop;
            const target = top - containerRect.height / 2 + tabRect.height / 2;
            container.scrollTo({ top: target, behavior: 'smooth' });
          }
        }
      },
      [direction, scrollIntoView],
    );

    useEffect(() => {
      const container = tabListContainerRef.current;
      if (!container) return;

      const resizeObserver = new ResizeObserver(() => {
        scrollToSelectedTab(value || defaultValue);
      });

      resizeObserver.observe(container);
      return () => resizeObserver.unobserve(container);
    }, [scrollToSelectedTab, value, defaultValue]);

    return (
      <BaseTabs
        onValueChange={(selectedValue) => {
          onValueChange?.(selectedValue);
          scrollToSelectedTab(selectedValue);
        }}
        defaultValue={defaultValue}
        value={value}
        className={cn('gap-3', direction === 'vertical' ? 'flex flex-col' : 'flex flex-row', className)}
        ref={ref}
        {...props}
      >
        <div className={cn('max-w-full overflow-auto', tabListContainerClassName)} ref={tabListContainerRef}>
          <BaseTabsList
            className={cn(
              'h-auto w-max',
              direction === 'vertical' ? 'flex flex-row' : 'flex flex-col',
              tabListClassName,
            )}
          >
            {tabs.map((tab) => (
              <BaseTabsTrigger
                key={tab.value}
                value={tab.value}
                disabled={tab.disabled}
                ref={(el) => {
                  triggersRef.current[tab.value] = el;
                }}
                className={tabTriggerClassName}
                role="tab"
                aria-controls={`tab-content-${tab.value}`}
              >
                {tab.label}
              </BaseTabsTrigger>
            ))}
          </BaseTabsList>
        </div>

        {tabs.map((tab) => (
          <BaseTabsContent
            className={cn('flex-1', tabContentClassName)}
            key={tab.value}
            value={tab.value}
            id={`tab-content-${tab.value}`}
            role="tabpanel"
            aria-labelledby={`tab-trigger-${tab.value}`}
          >
            {tab.content}
          </BaseTabsContent>
        ))}
      </BaseTabs>
    );
  },
);

Tabs.displayName = 'Tabs';

export { Tabs, type TabsItemProps };
