/**
 * GuideLinksType for GuideLinks component
 * @example
 * import GuideLinks from 'components/GuideLinks/GuideLinks';
 * 
 * <GuideLinks links={[{label: 'Privacy Policy', url: '/privacy'}, {label: 'Terms of Service', url: '/terms'}]} />
 */
export type GuideLinksType =  {
  links: {
    label: React.ReactNode;
    url: string;
  }[];
};