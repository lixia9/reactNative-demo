import { StyleSheet } from 'react-native';
export const commonStyles = StyleSheet.create({
    //-----阴影-------
    box_shadow: {
        shadowColor:'rgba(207,207,207,0.90)',
        shadowOffset:{width: 0, height: 0},
        shadowRadius: 3,
        shadowOpacity: 1,
        elevation: 3
    },
	//-----row-------
    flex_row_l_t: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    flex_row_l_m: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    flex_row_l_b: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    
    flex_row_l_s: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    //-----row-------
    flex_row_c_t: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    flex_row_c_m: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex_row_c_b: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    flex_row_c_s: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    //-----row-------
    flex_row_r_t: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    flex_row_r_m: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    flex_row_r_b: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    flex_row_r_s: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
    },
    //-----row-------
    flex_row_lr_t: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    flex_row_lr_m: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flex_row_lr_b: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    flex_row_lr_s: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },

    //-----column-------
    flex_column_l_t: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    flex_column_l_m: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    flex_column_l_b: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    
    flex_column_l_s: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    //-----column-------
    flex_column_c_t: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    flex_column_c_m: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex_column_c_b: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    flex_column_c_s: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    //-----column-------
    flex_column_r_t: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    flex_column_r_m: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    flex_column_r_b: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    flex_column_r_s: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
    },
    //-----column-------
    flex_column_lr_t: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    flex_column_lr_m: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flex_column_lr_b: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    flex_column_lr_s: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    }
});

