import React from 'react';
import { LayoutItem, useConfig } from '../../tools/useConfig';
import { Typography, styled } from '@mui/material';

const MainHeader = styled(Typography)(({ theme }) => ({
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
    display: "block",
    width: '100%',
    textAlign: 'center',
    paddingBottom: 8,
}));

const Logo = styled("img")(({ theme }) => ({
    width: "100%",
    height: 200,
    objectFit: "contain",
    [theme.breakpoints.down('md')]: {
        height: 150,
    }
}))

const LargeLogo = styled(Logo)(({ theme }) => ({
    height: 300,
    [theme.breakpoints.down('md')]: {
        height: 200,
    }
}))

const TextBlock = styled("div")(() => ({
    marginTop: 16,
}))

function LayoutRenderer() {
    const config = useConfig();

    return <>
        {config?.home?.layout?.map((item) => {
            const renderLayout = (layoutItem: LayoutItem) => {
                if (layoutItem.type === "text") {
                    const TextEl = layoutItem?.isMainHeader ? MainHeader : Typography;
                    const variant = layoutItem.variant !== "p" ? layoutItem.variant : "body1";
                    const color = layoutItem.variant === "p" ? "textPrimary" : "textSecondary";
                    return (
                        <TextEl variant={variant} color={color} fontWeight={layoutItem.isBold ? 700 : 400} display="inline">
                            {layoutItem.text}
                        </TextEl>
                    )
                } else if (layoutItem.type === "element") {
                    if (layoutItem.variant === "textBlock") {
                        return (
                            <TextBlock>
                                {layoutItem.content.map((contentItem) => {
                                    return renderLayout(contentItem)
                                })}
                            </TextBlock>
                        )
                    }
                } else if (layoutItem.type === "compoundText") {
                    return (
                        <div>
                            {layoutItem.content.map((contentItem) => {
                                return renderLayout(contentItem)
                            })}
                        </div>
                    )
                } else if (layoutItem.type === "logo") {
                    const LogoEl = layoutItem?.size === "large" ? LargeLogo : Logo;
                    return (
                        <LogoEl src={layoutItem.src} />
                    )
                }
            }
            return renderLayout(item);
        })}
    </>;
}

export default LayoutRenderer;