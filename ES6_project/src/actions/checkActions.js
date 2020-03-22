/* 
CRUD — Википедия
ru.wikipedia.org›CRUD
CRUD — акроним, обозначающий четыре базовые функции, используемые при работе с базами данных: 
создание (англ. create), чтение (read), модификация (update), удаление (delete)
 */
import { CHECK_OPTIONS } from '../constants/actions'

export function checkOptions () {
	return {
		type: CHECK_OPTIONS		
	}
}
