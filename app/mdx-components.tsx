// mdx-components.tsx
import type { MDXComponents } from 'mdx/types';
import { Tweet } from 'react-tweet';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // استخدم <Tweet id="..."/> داخل أي صفحة MDX بدون import
    Tweet,

    // صناديق شفافة سريعة
    InfoBox: (props: React.PropsWithChildren) => (
      <div className="info-box">{props.children}</div>
    ),

    // وسم لدور الديسكورد
    RoleTag: ({ color = '#10b981', children }: { color?: string; children: React.ReactNode }) => (
      <span
        style={{
          backgroundColor: `${color}22`,
          color,
          border: `1px solid ${color}`,
          borderRadius: 6,
          padding: '2px 8px',
          fontSize: '.85rem',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
    ),

    ...components,
  };
}
